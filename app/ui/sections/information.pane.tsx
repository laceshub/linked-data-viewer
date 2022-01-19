// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import * as React from "react";
import { Nav, TabContent } from "reactstrap";

import { InformationPaneConfig } from "app/services/config/app-config";
import { ITabProps, Tab } from "app/ui/tabs/tab";
import { TabAttributes } from "app/ui/tabs/tab.attributes";
import { TabMap } from "app/ui/tabs/tab.map";
import { TabInfo } from "app/ui/tabs/tab.info";
import { TabInstances } from "app/ui/tabs/tab.instances";
import { TabRelations } from "app/ui/tabs/tab.relations";
import { ITerm } from "app/services/data-model";

interface IInformationPaneState {
    activeTabId: string | undefined;
    visibleTabIds: string[];
}

interface IInformationPaneProps {
    config: InformationPaneConfig;
    currentTerm?: ITerm;
}

/*
 * Component that represents an information pane, which contains a number
 * of tabs. Which tabs are displayed depends on both the configuration
 * and which of these tabs actually contain content to be displayed. (If
 * a tab is considered empty, it will not be displayed among the tab links.)
 * To do this, all tabs are reloaded when a new 'currentTerm' becomes known.
 * None of the tabs is visible from the start, however. Only when they have
 * been loaded in, and they carry content, will the tab be added to the list
 * of visible tabs via its id (see 'visibleTabIds' and the function
 * 'setVisible').
 */
export class InformationPane extends React.Component<IInformationPaneProps, IInformationPaneState> {
    constructor(props: IInformationPaneProps) {
        super(props);
        this.toggleActiveTab = this.toggleActiveTab.bind(this);
        this.state = {
            activeTabId: undefined,
            visibleTabIds: []
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps: IInformationPaneProps) {
        if (
            nextProps.currentTerm != this.props.currentTerm &&
            (!(nextProps.currentTerm && this.props.currentTerm) ||
                nextProps.currentTerm.iri != this.props.currentTerm.iri)
        ) {
            console.log("resetting visibleTabIds");
            this.setState({
                activeTabId: undefined,
                visibleTabIds: []
            });
        }
    }

    getTabs() {
        const config = this.props.config;
        const term = this.props.currentTerm;
        const uri = term ? term.iri : undefined;
        const tabs: JSX.Element[] = [];
        if (!uri) {
            return tabs;
        }

        config.tabs.forEach((tabConfig) => {
            const tabId = tabConfig.id;
            const active = tabId === this.state.activeTabId;
            const unhide = () => {
                this.setVisible(tabId, true);
            };
            let newTab: JSX.Element | undefined;
            const newTabProps: ITabProps = {
                active,
                config: tabConfig,
                currentUri: uri,
                unhide
            };

            switch (tabConfig.type) {
                case "info":
                    newTab = <TabInfo key={tabConfig.id} {...newTabProps} />;
                    break;
                case "attributes":
                    newTab = <TabAttributes key={tabConfig.id} {...newTabProps} />;
                    break;
                case "relations":
                    newTab = <TabRelations key={tabConfig.id} {...newTabProps} />;
                    break;
                case "instances":
                    newTab = <TabInstances key={tabConfig.id} {...newTabProps} />;
                    break;
                case "map":
                    newTab = <TabMap key={tabConfig.id} {...newTabProps} />;
                    break;
            }
            if (newTab) {
                tabs.push(newTab);
            }
        });

        return tabs;
    }

    toggleActiveTab(tabId: string) {
        if (this.state.activeTabId !== tabId) {
            this.setState({
                activeTabId: tabId,
                visibleTabIds: this.state.visibleTabIds
            });
        }
    }

    setVisible(tabId: string, value: boolean) {
        console.log("setVisible: " + tabId + ", " + value);
        if (this.isVisible(tabId) === value) {
            return;
        }
        let visibleTabIds = this.state.visibleTabIds.slice();
        let activeTabId = this.state.activeTabId;

        if (value) {
            visibleTabIds.push(tabId);
            if (visibleTabIds.length == 1) {
                activeTabId = tabId;
            }
            this.setState({
                activeTabId,
                visibleTabIds
            });
            return;
        }

        const index = visibleTabIds.indexOf(tabId);
        visibleTabIds = visibleTabIds.splice(index, 1);
        if (visibleTabIds.length == 0) {
            activeTabId = undefined;
        }
        this.setState({
            activeTabId,
            visibleTabIds
        });
    }

    isVisible(tabId: string): boolean {
        return this.state.visibleTabIds.includes(tabId);
    }

    render() {
        const term = this.props.currentTerm;
        const tabs: JSX.Element[] = this.getTabs();
        const activeTabId = this.state.activeTabId;

        if (!term || !term.iri || !term.name) {
            return null;
        }

        return (
            <section className="rounded border border-dark">
                <div>
                    <Nav tabs>
                        <h3 className="mr-auto">{term.name}</h3>
                        {tabs.map((tab: JSX.Element, itab: number) => {
                            const tabId = tab.props.config.id;
                            const active = tabId == activeTabId;
                            const onClick = () => {
                                this.toggleActiveTab(tabId);
                            };
                            return !this.isVisible(tabId)
                                ? null
                                : Tab.renderLink(tab.props, active, onClick);
                        })}
                    </Nav>
                </div>
                <TabContent activeTab={activeTabId}>{tabs}</TabContent>
            </section>
        );
    }
}

// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import * as cn from "classnames";
import * as React from "react";
import { NavItem, NavLink, TabPane } from "reactstrap";

import { TabConfig } from "app/services/config/app-config";

interface ITabState {
    isEmpty: boolean;
}

export interface ITabProps {
    active: boolean;
    config: TabConfig;
    currentUri: string;
    unhide: () => void;
}

export abstract class Tab extends React.Component<ITabProps, ITabState> {
    constructor(props: ITabProps) {
        super(props);
        this.state = {
            isEmpty: true
        };
    }

    render(): JSX.Element {
        const config = this.props.config;

        return (
            <TabPane
                tabId={config.id}
                id={config.id}
                key={config.id}
                className={`tab-${config.type}`}
            >
                {this.renderContent()}
            </TabPane>
        );
    }

    componentDidMount() {
        const hideIfEmpty = this.props.config.hideIfEmpty;
        if (!hideIfEmpty || !this.state.isEmpty) {
            this.props.unhide();
        }
    }

    componentDidUpdate() {
        const hideIfEmpty = this.props.config.hideIfEmpty;
        if (!hideIfEmpty || !this.state.isEmpty) {
            this.props.unhide();
        }
    }

    shouldComponentUpdate(nextProps: ITabProps, nextState: ITabState) {
        if (nextProps.currentUri !== this.props.currentUri) {
            return true;
        }
        if (nextProps.active !== this.props.active) {
            return true;
        }
        if (nextState.isEmpty !== this.state.isEmpty) {
            return true;
        }
        return false;
    }

    UNSAFE_componentWillReceiveProps(nextProps: ITabProps) {
        if (nextProps.currentUri !== this.props.currentUri) {
            this.setState({
                isEmpty: true
            });
        }
    }

    public static renderLink(props: ITabProps, active: boolean = false, onClick: any): JSX.Element {
        const config = props.config;
        return (
            <NavItem key={`tabitem-${config.id}`}>
                <NavLink
                    className={cn({ active })}
                    id={`tablink-${config.id}`}
                    key={`tablink-${config.id}`}
                    onClick={onClick}
                >
                    <span className={config.icon} /> {config.name}
                </NavLink>
            </NavItem>
        );
    }

    protected abstract renderContent(): JSX.Element;
}

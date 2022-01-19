// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import * as React from "react";

import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from "reactstrap";
import { resolveInject } from "app/di";
import { IAppConfigProvider } from "app/services/config/app-config-loader.service";
import { ISparqlExecutor } from "app/services/infrastructure/sparql-executor";
import {
    SparqlResultParser,
    getRecordValue
} from "app/services/infrastructure/sparql-result-parser";
import { Search } from "app/ui/sections/search";

import "./top-menu.less";

interface IComponentState {
    name?: string;
    version?: string;
    isOpen: boolean;
}

interface IComponentProps {
    quicksearch?: boolean;
}

export class TopMenu extends React.Component<IComponentProps, IComponentState> {
    private appConfig = resolveInject(IAppConfigProvider).config;
    private sparqlExecutor = resolveInject(ISparqlExecutor);

    private toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

    constructor(props: IComponentProps) {
        super(props);
        this.state = { isOpen: false };
    }

    async componentDidMount() {
        await this.loadData(this.props);
    }

    async loadData(props: IComponentProps): Promise<void> {
        const sparqlResponse = await this.sparqlExecutor.execute(this.appConfig.queryOTL, []);
        const result = SparqlResultParser.parse(sparqlResponse);
        if (result.length == 0) {
            throw new Error("Error retrieving information on source");
        }
        const record = result[0];
        this.setState({
            name: getRecordValue(record, "text"),
            version: getRecordValue(record, "version")
        });
    }

    render(): JSX.Element | null {
        return (
            <div>
                <Navbar color="light" light expand="sm">
                    <NavbarBrand
                        href="#"
                        className="ex-app-logo"
                        title="LACES Linked Data Viewer"
                    />
                    <NavbarToggler onClick={this.toggleOpen} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="#">
                                    <span id="title-placeholder">{this.state.name}</span>
                                    <span id="version-placeholder">
                                        {" "}
                                        {this.state.version ? "(" + this.state.version + ")" : ""}
                                    </span>
                                    <span className="sr-only">(current)</span>
                                </NavLink>
                                {this.appConfig.subtitleHTML ? (
                                    <span
                                        className="subtitle"
                                        dangerouslySetInnerHTML={{
                                            __html: this.appConfig.subtitleHTML
                                        }}
                                    />
                                ) : (
                                    ""
                                )}
                            </NavItem>
                        </Nav>
                        <Search quicksearch={this.props.quicksearch} />
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

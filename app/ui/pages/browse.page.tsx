// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Row } from "reactstrap";

import { resolveInject } from "app/di";
import { IAppConfigProvider } from "app/services/config/app-config-loader.service";
import { ITerm, TermBuilder } from "app/services/data-model";
import { Breadcrumbs } from "app/ui/sections/breadcrumbs";
import { InformationPane } from "app/ui/sections/information.pane";
import { Hierarchy } from "app/ui/sections/hierarchy";
import { TopMenu } from "app/ui/sections/top-menu";
import { parseUrlQuery } from "app/utils/syntax-helpers";
import { SparqlResultParser } from "../../services/infrastructure/sparql-result-parser";
import { ISparqlExecutor } from "../../services/infrastructure/sparql-executor";
import { Resizable, Enable } from "re-resizable";

export interface IBrowsePageState {
    currentTerm?: ITerm;
    currentHierarchyPath?: ITerm[];
}

interface RouteParams {}

export interface IBrowsePageProps extends RouteComponentProps<RouteParams> {}

/*
 * Page component for browsing a hierarchy and seeing information on the
 * currently selected term (stored as an ITerm, which includes an iri, name,
 * and icon). If solely the iri of the current term is known during loading,
 * the further information will be loaded in the 'loadData' function to fill
 * in the missing information, which is then processed and disseminated to
 * child components that depend on the information.
 */
export class BrowsePage extends React.Component<IBrowsePageProps, IBrowsePageState> {
    public static PATHNAME = "/view";

    private appConfig = resolveInject(IAppConfigProvider).config;
    private sparqlExecutor = resolveInject(ISparqlExecutor);

    // This variable is used to temporarily store taxomomy path received from onObjectSelected handler
    // This value is processed in componentWillReceiveProps when we receive new URL
    private tempHierarchyPath?: ITerm[];

    constructor(props: IBrowsePageProps) {
        super(props);
        const uri = this.getUri(this.props);
        const term = this.getCurrentTermFromUri(uri);

        this.state = {
            currentTerm: term
        };
    }

    async componentDidMount() {
        await this.loadData(this.state);
    }

    async componentDidUpdate() {
        await this.loadData(this.state);
    }

    async loadData(state: IBrowsePageState) {
        const term = state.currentTerm;
        if (term && !term.name) {
            try {
                const sparqlResponse = await this.sparqlExecutor.execute(this.appConfig.queryTerm, [
                    { name: "term_iri", type: "uri", value: term.iri }
                ]);
                const result = SparqlResultParser.parse(sparqlResponse);
                const updatedTerm =
                    result && result.length > 0
                        ? TermBuilder.parseFromSparqlRecord(result[0])
                        : undefined;
                if (updatedTerm && updatedTerm.iri === term.iri) {
                    this.setState({ currentTerm: updatedTerm });
                }
            } catch (ex) {
                console.log(ex); // unable to properly load term
            }
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: IBrowsePageProps) {
        const newUri = this.getUri(nextProps);
        const currentUri = this.state.currentTerm ? this.state.currentTerm.iri : undefined;
        if (currentUri !== newUri) {
            if (
                this.tempHierarchyPath &&
                this.tempHierarchyPath[this.tempHierarchyPath.length - 1].iri !== newUri
            ) {
                //console.log("selected term is not coming from tree or breadcrumb", newUri);
                this.tempHierarchyPath = undefined;
            }

            //console.log("new uri:", newUri);
            this.setState({
                currentTerm:
                    this.getCurrentTermFromPath(this.tempHierarchyPath) ||
                    this.getCurrentTermFromUri(newUri),
                currentHierarchyPath: this.tempHierarchyPath
            });
        }
    }

    private getUri(props: IBrowsePageProps): string | undefined {
        const queryParams = parseUrlQuery(props.location.search);
        return queryParams.uri || this.appConfig.startTerm || undefined;
    }

    private getCurrentTermFromPath(path: ITerm[] | undefined): ITerm | undefined {
        if (path && path.length > 0) {
            return path[path.length - 1];
        }
        return undefined;
    }

    private getCurrentTermFromUri(uri: string | undefined): ITerm | undefined {
        if (uri && uri.length > 0) {
            const term = {
                iri: uri,
                name: ""
            };
            return term;
        }
        return undefined;
    }

    onTermSelected = (object: ITerm, parents: ITerm[]) => {
        this.tempHierarchyPath = [...parents, object];

        if (this.state.currentTerm && this.state.currentTerm.iri === object.iri) {
            // User tries  to select the same term and navigate to the same URL,
            // in which case the componentWillReceiveProps will not be triggered.
            // We still need to update the hierarchy path, however.
            this.setState({
                currentHierarchyPath: this.tempHierarchyPath
            });
        }
    };

    render(): JSX.Element {
        const resizableRights: Enable = {
            top: false,
            right: true,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false
        };
        return (
            <>
                <TopMenu quicksearch />
                <div className="container-fluid">
                    <Row style={{ flexWrap: "nowrap" }}>
                        <Resizable
                            enable={resizableRights}
                            defaultSize={{ width: "250px", height: "auto" }}
                            maxHeight="75vh"
                            className="rounded border border-dark"
                            style={{
                                display: "flex",
                                margin: "0.5em",
                                marginLeft: "1em"
                            }}
                        >
                            <Hierarchy
                                config={this.appConfig.hierarchies[0]}
                                currentTerm={this.state.currentTerm}
                                onSelect={this.onTermSelected}
                            />
                        </Resizable>
                        <div className="clearfix visible-xs" />
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                flexGrow: 1,
                                margin: "0.5em",
                                marginRight: "1em"
                            }}
                        >
                            <Breadcrumbs
                                config={this.appConfig.hierarchies[0]}
                                currentTerm={this.state.currentTerm}
                                path={this.state.currentHierarchyPath}
                                onSelect={this.onTermSelected}
                            />
                            <InformationPane
                                config={this.appConfig.informationPane}
                                currentTerm={this.state.currentTerm}
                            />
                        </div>
                    </Row>
                </div>
            </>
        );
    }
}

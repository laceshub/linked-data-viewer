// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import * as cn from "classnames";
import * as React from "react";
import { Spinner } from "reactstrap";
import { resolveInject } from "app/di";
import { HierarchyConfig } from "app/services/config/app-config";
import {
    TreeDataLoaderService,
    TreeRecord
} from "app/services/data-loader/tree-data-loader.service";
import { ITerm, Term, TermBuilder } from "app/services/data-model";
import { ISparqlExecutor } from "app/services/infrastructure/sparql-executor";
import { ErrorMessage } from "app/ui/_generic/error-message";
import { TextItem } from "app/ui/elements/text-item";

import "./hierarchy.less";

export interface IHierarchyState {
    data: TreeRecord[];
    isLoading?: boolean;
    error?: Error;
}

export interface IHierarchyProps {
    config: HierarchyConfig;
    currentTerm?: ITerm;
    onSelect(node: ITerm, parents: ITerm[]): void;
}

export class Hierarchy extends React.Component<IHierarchyProps, IHierarchyState> {
    private sparqlExecutor = resolveInject(ISparqlExecutor);
    private loader: TreeDataLoaderService;

    constructor(props: IHierarchyProps) {
        super(props);
        this.state = {
            data: [],
            isLoading: true
        };
        this.loader = new TreeDataLoaderService(this.sparqlExecutor, this.props.config);
    }

    async componentDidMount() {
        await this.loadData(this.props);
    }

    async loadData(props: IHierarchyProps): Promise<void> {
        try {
            const data = await this.loader.loadRootTreeLevel();
            this.setState({ data, isLoading: false });
        } catch (ex) {
            this.setState({ error: ex, isLoading: false });
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <section className="hierarchy" style={{ whiteSpace: "nowrap", overflowX: "auto" }}>
                    <h3>{this.props.config.name}</h3>
                    <Spinner size="sm" color="primary" />
                </section>
            );
        } else {
            return (
                <section className="hierarchy" style={{ whiteSpace: "nowrap", overflowX: "auto" }}>
                    <h3>{this.props.config.name}</h3>
                    {!this.state.error ? (
                        this.renderTree()
                    ) : (
                        <ErrorMessage error={this.state.error} />
                    )}
                </section>
            );
        }
    }

    renderTree() {
        const config = this.props.config;
        return (
            <table className={cn("table")} id={config.id}>
                <tbody>{this.renderTreeRecords(this.state.data, [])}</tbody>
            </table>
        );
    }

    renderTreeRecords(records: TreeRecord[], parents: ITerm[]): JSX.Element[] {
        return records.map((record, irow) => {
            const term = TermBuilder.parseFromSparqlRecord(record.record);
            return (
                <React.Fragment key={"row_" + irow}>
                    <tr>
                        <td key={"cell_" + irow + "_" + 0}>
                            {this.renderStubsAndExpander(record)}
                            <TextItem
                                text={term.name || Term.getLocalname(term.iri)}
                                link={term.iri}
                                icon={term.icon}
                                highlighted={
                                    this.props.currentTerm && term.iri == this.props.currentTerm.iri
                                }
                                onClick={() => {
                                    this.props.onSelect(term, parents);
                                }}
                            />
                        </td>
                    </tr>
                    {record.expanded && record.loading ? (
                        <>
                            {this.renderStubs(record.depth + 2)}
                            <Spinner size="sm" color="primary" />
                        </>
                    ) : (
                        <></>
                    )}
                    {record.children &&
                        record.children.length > 0 &&
                        record.expanded &&
                        this.renderTreeRecords(record.children, [...parents, term])}
                </React.Fragment>
            );
        });
    }

    renderStubs(count: number) {
        return (
            <>
                {Array(count)
                    .fill(0)
                    .map((x, i) => (
                        <span key={i} className="tree-stub" />
                    ))}
            </>
        );
    }

    renderStubsAndExpander(record: TreeRecord) {
        return (
            <>
                {this.renderStubs(record.depth)}
                {record.childCount > 0 ? (
                    <span
                        onClick={async () => await this.toggleRowExpand(record)}
                        className={cn("tree-stub row-expander", {
                            "is-expanded": record.expanded
                        })}
                    >
                        {/* TODO: Replace materal-icons md-16 by correct image class */}
                        <i className="oi oi-chevron-right" />{" "}
                    </span>
                ) : (
                    <span className="tree-stub" />
                )}
            </>
        );
    }

    async toggleRowExpand(record: TreeRecord) {
        if (record.expanded) {
            record.expanded = false;
        } else {
            try {
                if (record.childCount > 0 && record.children && record.children.length == 0) {
                    // Force it to expand before triggering the service
                    record.loading = true;
                    record.expanded = true;
                    this.forceUpdate();
                }

                await this.loader.expandTreeLevel(record);
            } catch (ex) {
                this.setState({ error: ex });
            }
        }
        this.forceUpdate();
    }
}

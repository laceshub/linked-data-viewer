// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import * as React from "react";
import { Breadcrumb, BreadcrumbItem, Spinner } from "reactstrap";

import { resolveInject } from "app/di";
import { HierarchyConfig } from "app/services/config/app-config";
import { ITerm, Term, TermBuilder } from "app/services/data-model";
import { ISparqlExecutor } from "app/services/infrastructure/sparql-executor";
import { SparqlResultParser } from "app/services/infrastructure/sparql-result-parser";
import { TextItem } from "app/ui/elements/text-item";

import "./breadcrumbs.less";

interface IBreadcrumbsState {
    isLoading?: boolean;
    path?: ITerm[];
}

interface IBreadcrumbsProps {
    config: HierarchyConfig;
    path?: ITerm[];
    currentTerm?: ITerm;
    onSelect(node: ITerm, parents: ITerm[]): void;
}

export class Breadcrumbs extends React.Component<IBreadcrumbsProps, IBreadcrumbsState> {
    private sparqlExecutor = resolveInject(ISparqlExecutor);

    constructor(props: IBreadcrumbsProps) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        await this.loadData(this.props);
    }

    async UNSAFE_componentWillReceiveProps(nextProps: IBreadcrumbsProps) {
        if (
            (this.props.path != nextProps.path || !nextProps.path) &&
            (!this.state.path ||
                this.state.path[this.state.path.length - 1].iri != nextProps.currentTerm?.iri)
        ) {
            await this.loadData(nextProps);
        }
    }

    async loadData(props: IBreadcrumbsProps): Promise<void> {
        const term = props.currentTerm;
        const uri = term ? term.iri : undefined;
        let path =
            this.state.path && this.state.path[this.state.path.length - 1].iri == uri
                ? this.state.path
                : props.path;
        if (!path && uri) {
            this.setState({ isLoading: true });
            const result = await this.sparqlExecutor.execute(props.config.queryBreadcrumbs, [
                { name: "term_iri", type: "uri", value: uri }
            ]);
            if (!Term.isSame(term, this.props.currentTerm) || this.props.path) {
                // Skip the data if we have received new term or path from props
                return;
            }

            const records = SparqlResultParser.parse(result);
            path = records.map((rec) => TermBuilder.parseFromSparqlRecord(rec));
            path = path.length == 0 && term ? [term] : path;
        }

        this.setState({
            path,
            isLoading: false
        });
    }

    render(): JSX.Element | null {
        if (!this.state.path && !this.props.currentTerm) {
            /*
             This is the case when we do not have path information or current object uri
             It happens on initial page when we do not have "startTerm" configured
             */
            return null;
        }
        return <Breadcrumb>{this.renderBreadcrumbs()}</Breadcrumb>;
    }

    renderBreadcrumbs(): JSX.Element[] {
        if (!this.state.path) {
            return [
                <BreadcrumbItem key="1" active>
                    <Spinner size="sm" color="primary" />
                </BreadcrumbItem>
            ];
        }

        const breadcrumbs: JSX.Element[] = [];
        let currentIndex = 0;
        for (const term of this.state.path) {
            const currentParents = this.state.path.slice(0, currentIndex);
            breadcrumbs.push(
                <BreadcrumbItem key={currentIndex}>
                    <TextItem
                        text={term.name || Term.getLocalname(term.iri)}
                        link={term.iri}
                        icon={term.icon}
                        highlighted={Term.isSame(term, this.props.currentTerm)}
                        onClick={() => {
                            this.props.onSelect(term, currentParents);
                        }}
                    />
                </BreadcrumbItem>
            );
            currentIndex++;
        }
        return breadcrumbs;
    }
}

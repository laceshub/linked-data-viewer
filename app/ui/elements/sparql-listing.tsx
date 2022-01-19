// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import * as React from "react";
import { Spinner } from "reactstrap";

import { resolveInject } from "app/di";
import {
    ISparqlExecutor,
    SparqlQueryParameters
} from "app/services/infrastructure/sparql-executor";
import {
    getRecordValue,
    SparqlRecord,
    SparqlResultParser
} from "app/services/infrastructure/sparql-result-parser";
import { ErrorMessage } from "app/ui/_generic/error-message";
import { TextItem } from "app/ui/elements/text-item";
import { DictionaryLike } from "app/utils/syntax-helpers";

import "./sparql-listing.less";

export interface ISparqlListingState {
    isLoading: boolean;
    data: SparqlRecord[];
    error?: Error;
}

export interface ISparqlListingProps {
    query: string;
    queryParameters: SparqlQueryParameters;
    onLoad?: (entryCount: number) => void;
}

/*
 * Component that represents a listing of groups. Each group listing consists
 * of a header and an unordered list. The group header and its items are based
 * on the SPARQL query passed, along with its query parameters.
 */
export class SparqlListing extends React.Component<ISparqlListingProps, ISparqlListingState> {
    private sparqlExecutor = resolveInject(ISparqlExecutor);

    constructor(props: ISparqlListingProps) {
        super(props);
        this.state = {
            isLoading: true,
            data: []
        };
    }

    async componentDidMount() {
        await this.loadData(this.props);
    }

    async UNSAFE_componentWillReceiveProps(newProps: ISparqlListingProps) {
        if (
            newProps.query != this.props.query ||
            newProps.queryParameters != this.props.queryParameters
        ) {
            await this.loadData(newProps);
        }
    }

    async loadData(props: ISparqlListingProps): Promise<void> {
        this.setState({ isLoading: true, error: undefined });
        try {
            const result = await this.sparqlExecutor.execute(props.query, props.queryParameters);
            const records = SparqlResultParser.parse(result);
            this.setState({ isLoading: false, data: records });

            if (this.props.onLoad) {
                this.props.onLoad(this.isEmpty() ? 0 : records.length);
            }
        } catch (ex) {
            this.setState({ isLoading: false, error: ex });
        }
    }

    render() {
        if (this.isEmpty()) {
            //?
            return <div />;
        } else if (this.state.isLoading) {
            return <Spinner className="spinner-listing" size="lg" color="primary" />;
        } else {
            return (
                <>
                    {!this.state.error ? (
                        this.renderListing()
                    ) : (
                        <ErrorMessage error={this.state.error} />
                    )}
                </>
            );
        }
    }

    renderGroupHeader(record: SparqlRecord) {
        const key: string = `list-group-${this.getGroupKey(record)}`;
        return (
            <div
                key={key}
                className="sparql-listing-group d-flex justify-content-between align-items-center"
            >
                <TextItem
                    text={getRecordValue(record, "group_text")}
                    link={getRecordValue(record, "group_iri")}
                    icon={getRecordValue(record, "group_icon")}
                    badge={getRecordValue(record, "group_badge")}
                />
            </div>
        );
    }

    renderGroupEntries(groupRecord: SparqlRecord) {
        const records = this.state.data;
        return records
            .filter((record: SparqlRecord): boolean => {
                return this.isSameGroup(record, groupRecord);
            })
            .map((record, irow) => {
                return this.renderEntry(record);
            });
    }

    renderEntry(record: SparqlRecord) {
        const key: string = `list-entry-${this.getGroupKey(record)}-${this.getEntryKey(record)}`;
        return (
            <li
                key={key}
                className="sparql-listing-entry list-group-item d-flex justify-content-between align-items-center"
            >
                <TextItem
                    text={getRecordValue(record, "entry_text")}
                    link={getRecordValue(record, "entry_iri")}
                    icon={getRecordValue(record, "entry_icon")}
                    badge={getRecordValue(record, "entry_badge")}
                    copyToClipboard
                />
            </li>
        );
    }

    renderListing() {
        const records = this.state.data;
        let groupRecord: SparqlRecord;
        return (
            <div className="sparql-listing">
                {records.map((record) => {
                    if (
                        !this.isEmptyRecord(record) &&
                        (!groupRecord || !this.isSameGroup(record, groupRecord))
                    ) {
                        groupRecord = record;
                        return (
                            <div
                                className="sparql-listing-list"
                                key={`list-${this.getGroupKey(record)}`}
                            >
                                {this.hasGroup(groupRecord) ? (
                                    this.renderGroupHeader(groupRecord)
                                ) : (
                                    <></>
                                )}
                                <ul
                                    className="sparql-listing-entries"
                                    key={`list-entries-${this.getGroupKey(record)}`}
                                >
                                    {this.renderGroupEntries(groupRecord)}
                                </ul>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        );
    }

    isEmpty(): boolean {
        const records = this.state.data;
        return !(records && records.length > 0 && this.hasEntry(records[0]));
    }

    isEmptyRecord(record: SparqlRecord): boolean {
        return !this.hasEntry(record);
    }

    hasGroup(record: SparqlRecord): boolean {
        if (!record) {
            return false;
        }
        const text = getRecordValue(record, "group_text");
        const iri = getRecordValue(record, "group_iri");
        if ((text && text.length > 0) || (iri && iri.length > 0)) {
            return true;
        }
        return false;
    }

    hasEntry(record: SparqlRecord): boolean {
        if (!record) {
            return false;
        }
        const text = getRecordValue(record, "entry_text");
        const iri = getRecordValue(record, "entry_iri");
        if ((text && text.length > 0) || (iri && iri.length > 0)) {
            return true;
        }
        return false;
    }

    isSameGroup(lhs: SparqlRecord, rhs: SparqlRecord): boolean {
        if (this.hasGroup(lhs) != this.hasGroup(rhs)) {
            return false;
        }
        if (!this.hasGroup(lhs)) {
            return true;
        }
        if (
            getRecordValue(lhs, "group_text") != getRecordValue(rhs, "group_text") ||
            getRecordValue(lhs, "group_iri") != getRecordValue(rhs, "group_iri")
        ) {
            return false;
        }
        return true;
    }

    getGroupKey(record: SparqlRecord): string {
        const iri = getRecordValue(record, "group_iri");
        const text = getRecordValue(record, "group_text");
        return "group{iri:" + iri + "&text:" + text + "}";
    }

    getEntryKey(record: SparqlRecord): string {
        const iri = getRecordValue(record, "entry_iri");
        const text = getRecordValue(record, "entry_text");
        return "entry{iri:" + iri + "&text:" + text + "}";
    }
}

// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import { getRecordValue, SparqlResultParser } from "../infrastructure/sparql-result-parser";
import { resolveInject } from "app/di";
import { IAppConfigProvider } from "../config/app-config-loader.service";
import { ISparqlExecutor } from "../infrastructure/sparql-executor";

interface SearchState {
    search?: SearchData;
    results?: ResultData;
    listeners: Set<ChangeListener>;
}

export interface SearchOptions {
    limit?: number;
}

export interface SearchData {
    key: string;
    options?: SearchOptions;
}

export interface ResultData {
    key: string;
    options?: SearchOptions;
    matches?: MatchObject[];
    limited?: boolean;
    message?: string;
}

export interface MatchObject {
    iri: string;
    name?: string;
    groupText?: string;
}

export interface ChangeListener {
    onChange(e: ChangeEvent): void;
}

export interface ChangeEvent {
    type: ChangeEventType;
    data: any;
}

export enum ChangeEventType {
    Results,
    Message
}

export class SearchEngine {
    public static MAXCOUNT_QUICKSEARCH_ITEMS: number = 10;

    private static state: SearchState = {
        listeners: new Set()
    };

    public static async search(key: string, options?: SearchOptions) {
        this.getOptions(options);

        if (key.length == 0) {
            this.state.search = undefined;
            return;
        }

        this.state.search = { key, options };
        let matches: MatchObject[] = [];
        let message = undefined;
        let limited = false;

        if (
            this.state.results &&
            this.state.results.key === key &&
            this.state.results.options === this.state.search.options
        ) {
            matches =
                this.state.results && this.state.results.matches ? this.state.results.matches : [];
        } else {
            const appConfig = resolveInject(IAppConfigProvider).config;
            const sparqlExecutor = resolveInject(ISparqlExecutor);
            this.state.results = undefined;
            const options = this.state.search && this.state.search.options;
            const searchLimit = options && options.limit;
            const sparqlResponse = await sparqlExecutor.execute(
                appConfig.querySearch +
                    (searchLimit && searchLimit > 0 ? "\r\nLIMIT " + (searchLimit + 1) : ""),
                [{ name: "searchKey", type: "text", value: key }]
            );
            if (sparqlResponse == null || this.state.search.key !== key) {
                // State might update while we were waiting for ajax call
                return;
            }
            const result = SparqlResultParser.parse(sparqlResponse);
            matches = result.map((r: any) => ({
                iri: getRecordValue(r, "entry_iri"),
                name: getRecordValue(r, "entry_text"),
                groupText: getRecordValue(r, "group_text")
            }));
            if (searchLimit && searchLimit > 0 && searchLimit < matches.length) {
                limited = true;
                matches = matches.slice(0, searchLimit);
                message = "Showing first " + searchLimit + " results";
            } else {
                message = "Showing search results";
            }
            const sorted = appConfig.querySearch.toLowerCase().includes("order by ");
            if (!sorted) {
                SearchEngine.sortMatchesAlphabetical(matches);
            }
        }

        const results = { key, options, matches, limited, message };
        this.state.results = results;
        this.fireEvent(ChangeEventType.Results, results);
    }

    public static getOptions(options: any) {
        return;
    }

    public static addChangeListener(listener: ChangeListener) {
        this.state.listeners.add(listener);
    }

    public static removeChangeListener(listener: ChangeListener) {
        this.state.listeners.delete(listener);
    }

    public static fireEvent(type: ChangeEventType, data?: any) {
        const e: ChangeEvent = { type, data };
        this.state.listeners.forEach((listener) => {
            listener.onChange(e);
        });
    }

    public static getMatchesPer(keyName: string, matches: MatchObject[]) {
        const groups: { [key: string]: MatchObject[] } = {};
        for (const match of matches) {
            const key = match[keyName as keyof MatchObject] || "";
            groups[key] = [...(groups[key] || []), match];
        }
        return Object.entries(groups);
    }

    protected static sortMatchesAlphabetical(matches: MatchObject[], asc = true) {
        matches.sort((a, b) => {
            let retval = (a.groupText || "").localeCompare(b.groupText || "");
            if (retval == 0) {
                retval = (a.name || a.iri).localeCompare(b.name || b.iri);
                if (retval == 0) {
                    retval = a.iri.localeCompare(b.iri);
                }
            }
            return retval * (asc ? 1 : -1);
        });
    }
}

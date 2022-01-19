// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import { ISparqlExecutor } from "app/services/infrastructure/sparql-executor";
import { SparqlRecord, SparqlResultParser } from "app/services/infrastructure/sparql-result-parser";

export interface TreeRecord {
    expanded?: boolean;
    loading?: boolean;
    uri: string;
    childCount: number;
    depth: number;
    record: SparqlRecord;
    children?: TreeRecord[];
}

export interface TreeDataLoaderOptions {
    queryRoots: string;
    queryChildren: string;
}

export class TreeDataLoaderService {
    constructor(private sparqlExecutor: ISparqlExecutor, private options: TreeDataLoaderOptions) {}

    async loadRootTreeLevel() {
        return await this.loadTreeLevel();
    }

    async expandTreeLevel(treeRecord: TreeRecord): Promise<void> {
        if (treeRecord.children && treeRecord.children.length > 0) {
            treeRecord.expanded = true;
            return;
        }

        if (treeRecord.childCount > 0) {
            treeRecord.loading = true;
            treeRecord.children = await this.loadTreeLevel(treeRecord.uri, treeRecord.depth + 1);
            treeRecord.expanded = true;
            treeRecord.loading = false;
        }
    }

    private async loadTreeLevel(term_iri: string = "", depth: number = 0): Promise<TreeRecord[]> {
        const options = this.options;
        const sparqlResult =
            depth == 0
                ? await this.sparqlExecutor.execute(options.queryRoots, [])
                : await this.sparqlExecutor.execute(options.queryChildren, [
                      { name: "term_iri", type: "uri", value: term_iri }
                  ]);

        const sparqlRecords = SparqlResultParser.parse(sparqlResult);
        const treeRecords = this.parseLevel(sparqlRecords, options, depth);
        const levelsToExpand: number = 0;
        if (depth < levelsToExpand) {
            for (const treeRecord of treeRecords) {
                await this.expandTreeLevel(treeRecord);
            }
        }
        return treeRecords;
    }

    private parseLevel(records: SparqlRecord[], options: TreeDataLoaderOptions, deepLevel: number) {
        const result: TreeRecord[] = [];
        for (const record of records) {
            const treeRecord: TreeRecord = {
                record,
                loading: false,
                uri: this.getRecordValue(record, "entry_iri"),
                childCount: parseInt(this.getRecordValue(record, "entry_childCount"), 10),
                children: [],
                expanded: false,
                depth: deepLevel
            };
            result.push(treeRecord);
        }
        return result;
    }

    private getRecordValue(record: SparqlRecord, varName: string | undefined): string {
        const val = record[varName || ""];
        if (val) {
            return val.value;
        }
        return "";
    }
}

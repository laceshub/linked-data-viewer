// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import { ISparqlJsonResult } from "app/services/infrastructure/sparql-executor";
import { DictionaryLike } from "app/utils/syntax-helpers";

export type SparqlValueType = undefined | "literal" | "uri";

export interface SparqlValue {
    type: SparqlValueType;
    value: any;
}

export type SparqlRecord = DictionaryLike<SparqlValue>;

export class SparqlResultParser {
    static parse(result: ISparqlJsonResult): SparqlRecord[] {
        const vars = result.head.vars;
        const bindings = result.results.bindings;
        const records: SparqlRecord[] = [];
        for (const binding of bindings) {
            const record: SparqlRecord = {};
            let hasValue: boolean = false;
            for (const varName of vars) {
                const value = binding[varName];
                if (value) {
                    hasValue = true;
                    record[varName] = value;
                } else {
                    record[varName] = { type: undefined, value: undefined };
                }
            }
            if (hasValue) {
                records.push(record);
            }
        }
        return records;
    }
}

export function getRecordValue(record: SparqlRecord, varName: string | undefined): string {
    const val = record[varName || ""];
    if (val) {
        return val.value;
    }
    return "";
}

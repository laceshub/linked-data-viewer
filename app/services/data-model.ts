// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import { getRecordValue, SparqlRecord } from "app/services/infrastructure/sparql-result-parser";

export interface ITerm {
    iri: string;
    name: string;
    icon?: string;
}

export class Term {
    /**
     * This functions returns whether one term, 'lhs', is deemed the same as
     * another, 'rhs'. Two terms are considered the same if they are either
     * (1) both undefined or (2) both defined and carry the same iri.
     */
    public static isSame(lhs: ITerm | undefined, rhs: ITerm | undefined): boolean {
        if (!lhs && !rhs) {
            return true;
        }
        if (lhs && rhs && lhs.iri === rhs.iri) {
            return true;
        }
        return false;
    }

    /**
     * This functions returns whether one term, 'lhs', is deemed the same in
     * content as another, 'rhs'. Two terms are considered the same in content
     * if they are either (1) both undefined or (2) both defined and carry
     * the same iri, name, and icon.
     */
    public static isSameInContent(lhs: ITerm | undefined, rhs: ITerm | undefined): boolean {
        if (!this.isSame(lhs, rhs)) {
            return false;
        }
        if (!lhs && !rhs) {
            return true;
        }
        if (lhs && rhs && lhs.iri === rhs.iri && lhs.name === rhs.name && lhs.icon === rhs.icon) {
            return true;
        }
        return false;
    }

    public static getLocalname(iri: string) {
        return iri.replace(/.*[\/#:]/, "");
    }
}

export class TermBuilder {
    /**
     * Function that parses a SPARQL record to retrieve an ITerm.
     * By default, it parses the record using "entry_iri", "entry_text" etc.
     * as the variables to be parsed. It is possible to set the 'using'
     * parameter to "group" instead, however, to parse "group_iri",
     * "group_text" etc. instead.
     */
    public static parseFromSparqlRecord(record: SparqlRecord, using: string = "entry"): ITerm {
        const iri = getRecordValue(record, using + "_iri");
        const name = getRecordValue(record, using + "_text") || Term.getLocalname(iri);
        const icon = getRecordValue(record, using + "_icon");
        return { name, iri, icon };
    }
}

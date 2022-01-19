// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import {
    ISparqlExecutor,
    ISparqlJsonResult,
    SparqlQueryParameters
} from "app/services/infrastructure/sparql-executor";

export class FakeSparqlExecutor implements ISparqlExecutor {
    constructor(private fakeResult: ISparqlJsonResult) {}

    async execute(query: string, parameters: SparqlQueryParameters): Promise<ISparqlJsonResult> {
        return this.fakeResult;
    }
}

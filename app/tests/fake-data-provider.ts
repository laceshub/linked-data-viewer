// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Semmtech B.V.

import * as _ from "lodash";

export class FakeDataProvider {
    public static getFakeAppConfig = () =>
        _.cloneDeep(require("app/tests/fake-data/fake-config.json"));

    public static getFakeSparqlResultDocumenten = () =>
        _.cloneDeep(require("./fake-data/fake-sparql-result-documenten.json"));

    public static getFakeSparqlResultKoppelingen = () =>
        _.cloneDeep(require("./fake-data/fake-sparql-result-koppelingen.json"));
}

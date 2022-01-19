// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Semmtech B.V.

import * as React from "react";
import { Tab } from "app/ui/tabs/tab";
import { SparqlMap } from "app/ui/elements/sparql-map";
import { MapboxOptions } from "mapbox-gl";

import "./tab.map.less";

export class TabMap extends Tab {
    renderContent(): JSX.Element {
        const config = this.props.config;
        const term_iri = this.props.currentUri;
        const onLoad = (entryCount: number) => {
            const isEmpty = entryCount <= 0;
            this.setState({ isEmpty });
        };

        return (
            <SparqlMap
                id={config.id + "-sparqlMap"}
                config={config.object as MapboxOptions}
                query={config.query}
                queryParameters={[{ name: "term_iri", type: "uri", value: term_iri }]}
                onLoad={onLoad}
            />
        );
    }
}

// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import * as React from "react";

import { SparqlListing } from "app/ui/elements/sparql-listing";
import { Tab } from "app/ui/tabs/tab";

import "./tab.attributes.less";

export class TabAttributes extends Tab {
    renderContent(): JSX.Element {
        const config = this.props.config;
        const term_iri = this.props.currentUri;
        const onLoad = (entryCount: number) => {
            const isEmpty = entryCount <= 0;
            this.setState({ isEmpty });
        };
        return (
            <SparqlListing
                query={config.query}
                queryParameters={[{ name: "term_iri", type: "uri", value: term_iri }]}
                onLoad={onLoad}
            />
        );
    }
}

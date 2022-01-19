// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import * as React from "react";
import * as CopyToClipboard from "react-copy-to-clipboard";
import { UncontrolledPopover, PopoverBody } from "reactstrap";

import { SparqlListing } from "app/ui/elements/sparql-listing";
import { Tab } from "app/ui/tabs/tab";

import "./tab.info.less";

export class TabInfo extends Tab {
    renderContent(): JSX.Element {
        const config = this.props.config;
        const term_iri = this.props.currentUri;
        const onLoad = (entryCount: number) => {
            this.setState({ isEmpty: false });
        };
        return (
            <>
                <p className="iri">
                    <em>URI:</em>&nbsp;{term_iri}
                    <CopyToClipboard text={term_iri}>
                        <button id="UriPopoverFocus" className="copy-document-icon" />
                    </CopyToClipboard>
                    <UncontrolledPopover
                        trigger="focus"
                        placement="bottom"
                        target={"UriPopoverFocus"}
                    >
                        <PopoverBody>Copied!</PopoverBody>
                    </UncontrolledPopover>
                </p>
                <SparqlListing
                    query={config.query}
                    queryParameters={[{ name: "term_iri", type: "uri", value: term_iri }]}
                    onLoad={onLoad}
                />
            </>
        );
    }
}

// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import * as React from "react";

import {
    MatchObject,
    ResultData,
    SearchEngine
} from "app/services/data-loader/search-engine.service";
import { DropdownItem } from "reactstrap";
import { Link } from "react-router-dom";
import { NavigateService } from "app/services/navigate.service";

import "./search-results.less";

interface IComponentProps {
    results?: ResultData;
}

export class SearchResults extends React.Component<IComponentProps> {
    constructor(props: IComponentProps) {
        super(props);
        this.state = {};
    }

    performUnlimitedSearch = async () => {
        const results = this.props.results;
        const options = (results && results.options) || {};
        options.limit = 0;
        if (results) {
            SearchEngine.search(results.key, options);
        }
    };

    render(): JSX.Element | null {
        const results = this.props.results;
        if (!results) {
            return null;
        }

        //console.log(results);

        const matches = results.matches ? results.matches : [];

        return (
            <section className="rounded border border-dark">
                <h3 className="mr-auto">Search results for ‘{results.key}’</h3>

                <div>
                    {results.message}
                    {!results.limited ? (
                        ""
                    ) : (
                        <>
                            &nbsp;
                            <small className="hoverPointer" onClick={this.performUnlimitedSearch}>
                                [show all]
                            </small>
                        </>
                    )}
                </div>

                {this.renderGroups(matches)}
            </section>
        );
    }

    renderGroups(matches: MatchObject[]) {
        const matchesPerGroup = SearchEngine.getMatchesPer("groupText", matches);
        return matchesPerGroup.map(([groupText, groupItems], index: number) => {
            return (
                <React.Fragment key={groupText}>
                    <DropdownItem header>{groupText} </DropdownItem>
                    {groupItems.map((item: any) => {
                        return (
                            <DropdownItem
                                key={groupText + "_" + item.iri}
                                tag={() => (
                                    <Link
                                        to={NavigateService.getBrowseLink(item.iri)}
                                        className="dropdown-item search-result-item"
                                    >
                                        {item.name || item.iri}
                                    </Link>
                                )}
                            />
                        );
                    })}
                    {/* Do not render divider for the last item */}
                    {index < matchesPerGroup.length - 1 && <DropdownItem divider />}
                </React.Fragment>
            );
        });
    }
}

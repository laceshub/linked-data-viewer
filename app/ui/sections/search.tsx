// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import * as React from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { resolveInject } from "app/di";
import { IAppConfigProvider } from "app/services/config/app-config-loader.service";
import { ISparqlExecutor } from "app/services/infrastructure/sparql-executor";
import { NavigateService } from "app/services/navigate.service";
import {
    SearchEngine,
    ChangeEvent,
    ChangeListener,
    ResultData
} from "app/services/data-loader/search-engine.service";

import "./search.less";

interface IComponentState {
    searchTerm: string;
    searchTermIsTooShort: boolean;
    searchResults?: ResultData;
    isSearchResultsOpen: boolean;
    isSearchInProgress: boolean;
}

interface IComponentProps {
    quicksearch?: boolean;
}

interface MatchObject {
    iri: string;
    name: string;
    groupText: string;
}

export class Search
    extends React.Component<IComponentProps, IComponentState>
    implements ChangeListener
{
    private appConfig = resolveInject(IAppConfigProvider).config;
    private sparqlExecutor = resolveInject(ISparqlExecutor);
    private searchTimer: any;

    constructor(props: IComponentProps) {
        super(props);
        this.state = {
            searchTerm: "",
            searchTermIsTooShort: true,
            isSearchResultsOpen: false,
            isSearchInProgress: false
        };
    }

    async componentDidMount() {
        SearchEngine.addChangeListener(this);
    }

    async componentWillUnmount() {
        SearchEngine.removeChangeListener(this);
    }

    onChange(e: ChangeEvent) {
        this.setState({
            isSearchInProgress: false,
            searchResults: e.data
        });
    }

    performSearch = async (limitSearch: boolean = true) => {
        const searchTerm = this.state.searchTerm;

        if (searchTerm.length < 2) {
            this.setState({
                searchTermIsTooShort: true,
                isSearchResultsOpen: true
            });
            return;
        }

        this.setState({
            searchTermIsTooShort: false,
            isSearchInProgress: true,
            isSearchResultsOpen: true
        });

        const searchOptions = limitSearch ? { limit: SearchEngine.MAXCOUNT_QUICKSEARCH_ITEMS } : {};
        SearchEngine.search(searchTerm, searchOptions);
    };

    performUnlimitedSearch = async () => {
        NavigateService.search(this.state.searchTerm, { limit: 0 });
    };

    closeSearch = () => {
        this.setState({ isSearchResultsOpen: false });
    };

    searchBtnClick = async () => {
        const searchKey = this.state.searchTerm;
        if (this.searchTimer) {
            clearTimeout(this.searchTimer);
        }

        if (this.isIriPattern(searchKey)) {
            NavigateService.browse(searchKey);
            return;
        }

        await this.performSearch();
    };

    isIriPattern(text: string): boolean {
        return text.startsWith("http://") || text.startsWith("https://");
    }

    searchInputChange(newValue: string) {
        this.setState({ searchTerm: newValue });
        if (this.searchTimer) {
            clearTimeout(this.searchTimer);
        }
        this.searchTimer = setTimeout(async () => {
            await this.performSearch();
        }, 500);
    }

    searchInputKeyDown(keyCode: number) {
        // Keyboard button <Enter>
        if (keyCode == 13) {
            this.searchBtnClick();
        }
        // Keyboard button <Arrow down>
        if (keyCode === 40) {
            this.setFocusToSearchResults();
        }
    }

    setFocusToSearchResults() {
        const searchResults = document.querySelector(".search-result-item") as HTMLElement;
        if (searchResults) {
            searchResults.focus();
        }
    }

    render(): JSX.Element {
        return (
            <form className="form-inline my-2 my-lg-0 search-component">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        aria-label="Search"
                        value={this.state.searchTerm}
                        onChange={(e) => this.searchInputChange(e.target.value)}
                        onKeyDown={(e) => this.searchInputKeyDown(e.which)}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={this.searchBtnClick}
                        >
                            <span className="oi oi-magnifying-glass" />
                        </button>
                    </div>
                    {this.props.quicksearch && (
                        <Dropdown isOpen={this.state.isSearchResultsOpen} toggle={this.closeSearch}>
                            <DropdownToggle tag="span" className="invisible-dropdown-toggler" />
                            <DropdownMenu right modifiers={{ computeStyle: { y: "left" } }}>
                                {this.renderSearchResult()}
                            </DropdownMenu>
                        </Dropdown>
                    )}
                </div>
            </form>
        );
    }

    getSearchMessage() {
        if (!this.state.searchTerm) {
            return "Please enter search term";
        }
        if (this.state.searchTermIsTooShort) {
            return "Search term is too short";
        }
        if (this.state.isSearchInProgress) {
            return "Searching...";
        }
        if (
            this.state.searchResults &&
            this.state.searchResults.matches &&
            this.state.searchResults.matches.length === 0
        ) {
            return "No results";
        }
        return null;
    }

    renderSearchResult() {
        const msg = this.getSearchMessage();
        if (msg) {
            return <DropdownItem header>{msg}</DropdownItem>;
        }

        const results = this.state.searchResults;
        if (results === undefined) {
            return;
        }

        const matches = (results.matches || []).slice(
            0,
            results.limited ? SearchEngine.MAXCOUNT_QUICKSEARCH_ITEMS : undefined
        );
        const matchesPerGroup = SearchEngine.getMatchesPer("groupText", matches);

        return (
            <>
                <DropdownItem header>
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
                </DropdownItem>
                <DropdownItem divider />
                {matchesPerGroup.map(([groupIri, groupItems], index) => {
                    return (
                        <React.Fragment key={groupIri}>
                            <DropdownItem header>{groupItems[0].groupText} </DropdownItem>
                            {groupItems.map((item) => {
                                return (
                                    <DropdownItem
                                        key={item.iri}
                                        tag={() => (
                                            <Link
                                                to={"?uri=" + encodeURIComponent(item.iri)}
                                                className="dropdown-item search-result-item"
                                                onClick={this.closeSearch}
                                            >
                                                {item.name}
                                            </Link>
                                        )}
                                    />
                                );
                            })}
                            {/* Do not render divider for the last item */}
                            {index < matchesPerGroup.length - 1 && <DropdownItem divider />}
                        </React.Fragment>
                    );
                })}
            </>
        );
    }
}

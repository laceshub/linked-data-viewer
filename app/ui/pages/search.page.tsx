// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Col, Row, Container, UncontrolledTooltip, Button } from "reactstrap";
import { TopMenu } from "app/ui/sections/top-menu";
import { getQueryParam, getQueryParams } from "app/utils/syntax-helpers";
import {
    SearchEngine,
    ChangeListener,
    ChangeEvent,
    ResultData
} from "app/services/data-loader/search-engine.service";
import { SearchResults } from "app/ui/sections/search-results";
import { SearchOptions } from "app/services/data-loader/search-engine.service";
import { NavigateService } from "app/services/navigate.service";

export interface ISearchPageState {
    results?: ResultData;
}

export interface ISearchPageProps extends RouteComponentProps<RouteParams> {}

interface RouteParams {}

/*
 * Page component for searching a thesaurus.
 */
export class SearchPage
    extends React.Component<ISearchPageProps, ISearchPageState>
    implements ChangeListener
{
    public static PATHNAME = "/search";

    constructor(props: ISearchPageProps) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        SearchEngine.addChangeListener(this);
        const key = getQueryParam("key", this.props);
        const options = getQueryParams(["limit", "type", "sort"], this.props);
        if (key) {
            this.searchFor(key, options);
        }
    }

    componentWillUnmount() {
        SearchEngine.removeChangeListener(this);
    }

    componentDidUpdate(prevProps: ISearchPageProps) {
        const prevKey = getQueryParam("key", prevProps);
        const currKey = getQueryParam("key", this.props);
        const prevOptions = getQueryParams(["limit", "type", "sort"], prevProps);
        const currOptions = getQueryParams(["limit", "type", "sort"], this.props);
        if (
            currKey &&
            (currKey != prevKey || JSON.stringify(currOptions) != JSON.stringify(prevOptions))
        ) {
            this.searchFor(currKey, currOptions);
        }
    }

    onChange(e: ChangeEvent) {
        const key = e.data.key;
        const options = e.data.options;
        NavigateService.search(key, options);
        this.setState({ results: e.data });
    }

    searchFor(key: string, options?: SearchOptions) {
        options = options || getQueryParams(["limit", "type", "sort"], this.props);
        if (options && !options.limit) {
            options.limit = SearchEngine.MAXCOUNT_QUICKSEARCH_ITEMS;
        }
        SearchEngine.search(key, options);
    }

    render(): JSX.Element {
        const results = this.state ? this.state.results : undefined;
        return (
            <>
                <TopMenu quicksearch={false} />
                <Container fluid>
                    <Row>
                        <Col className="single-column">
                            <SearchResults results={results} />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

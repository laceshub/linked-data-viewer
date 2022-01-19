// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import * as React from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";

import { AboutPage } from "app/ui/pages/about.page";
import { BrowsePage } from "app/ui/pages/browse.page";
import { SearchPage } from "app/ui/pages/search.page";

export class Main extends React.Component {
    render(): JSX.Element {
        return (
            <HashRouter>
                <>
                    <Switch>
                        <Route exact path="/about" component={AboutPage} />
                        <Route exact path="/view" component={BrowsePage} />
                        <Route exact path="/view/:uri" component={BrowsePage} />
                        <Route exact path="/search" component={SearchPage} />
                        <Redirect from="/" to="/view" />
                    </Switch>
                </>
            </HashRouter>
        );
    }
}

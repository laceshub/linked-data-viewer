// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import "core-js/es6"; // Include polyfills to work in IE11
import "core-js/es7"; // Include polyfills to work in IE11
import * as React from "react";
import * as ReactDOM from "react-dom";

import { setupInject } from "app/di";
import {
    AppConfigLoaderService,
    IAppConfigProvider
} from "app/services/config/app-config-loader.service";
import { AjaxService } from "app/services/infrastructure/ajax-service";
import { AjaxSparqlExecutor, ISparqlExecutor } from "app/services/infrastructure/sparql-executor";
import { Main } from "app/ui/main";
import { ErrorPage } from "app/ui/pages/error.page";

import "./app.less";

async function runApp() {
    const appHostDomElement = document.getElementById("app-container") || document.body;
    try {
        //await stay(2000);
        const ajaxService = new AjaxService();
        const confLoader = new AppConfigLoaderService();
        const appConfig = await confLoader.loadConfig(ajaxService);
        const sparqlExecutor = new AjaxSparqlExecutor(appConfig.dataServiceOptions);

        // Setup the global dependency injection container
        setupInject(IAppConfigProvider, confLoader);
        setupInject(ISparqlExecutor, sparqlExecutor);

        // Render the app
        ReactDOM.render(<Main />, appHostDomElement);
    } catch (ex) {
        ReactDOM.render(<ErrorPage error={ex} />, appHostDomElement);
        throw ex;
    }
}

Object.assign(window, {
    app: {
        run: runApp
    }
});

// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import * as tv4 from "tv4";

import { AppConfig } from "app/services/config/app-config";
import { IAjaxService } from "app/services/infrastructure/ajax-service";

const appConfigSchema = require("app/../config/config.schema.json");

export abstract class IAppConfigProvider {
    abstract get config(): AppConfig;
}

export class AppConfigLoaderService implements IAppConfigProvider {
    private _config: AppConfig | undefined;

    get config(): AppConfig {
        if (!this._config) {
            throw new Error("App config should be loaded first");
        }
        return this._config;
    }

    public async loadConfig(ajaxService: IAjaxService): Promise<AppConfig> {
        const config = await ajaxService.getJson<AppConfig>("config.json", { noCache: true });

        this.setDefaultValues(config);
        this.validate(config);

        // load sparql queries dynamically and in parallel
        const promises: Promise<any>[] = [];
        this.loadTextDataFromUrlRecursively(config, ajaxService, promises);
        await Promise.all(promises);

        this._config = config;
        return config;
    }

    /**
     * This functions iterates over ALL properties of config object recursively and loads a text data
     * specified by relative url in case of value matches the "url:Relative_url_path" pattern.
     * Will return array of promises, each promise is responsible of loading the data and
     * assigning the value back to config object.
     * @param configObj The config object
     * @param ajaxService The ajax service instance
     * @param promises Resulting array of promises
     */
    private loadTextDataFromUrlRecursively(
        configObj: any,
        ajaxService: IAjaxService,
        promises: Promise<any>[]
    ) {
        for (const [key, value] of Object.entries(configObj)) {
            if (typeof value === "string") {
                const valStr = value as string;
                if (valStr.startsWith("url:")) {
                    const url = valStr.substr(4);
                    const loader = async () => {
                        const loadedData = await ajaxService.getText(url);
                        configObj[key] = loadedData;
                    };
                    promises.push(loader());
                }
            } else if (typeof value === "object" && value) {
                this.loadTextDataFromUrlRecursively(value, ajaxService, promises);
            }
        }
    }

    /**
     * This function walks through config objects, filling in default values where needed.
     */
    private setDefaultValues(config: AppConfig) {
        config.informationPane.tabs.forEach((tab) => {
            tab.hideIfEmpty = tab.hideIfEmpty === undefined ? true : tab.hideIfEmpty;
        });
    }

    /**
     * This function checks that the configuration conforms to the schema
     */
    private validate(config: AppConfig) {
        const validationResult = tv4.validateMultiple(config, appConfigSchema);
        if (!validationResult.valid) {
            const messages = validationResult.errors.map(
                (error: any) => `Error message: "${error.message}". Data path: "${error.dataPath}".`
            );
            throw new Error(
                `The configuration file for the application does not conform to the schema.\r\n${messages.join(
                    "\r\n"
                )}`
            );
        }
    }
}

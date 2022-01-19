// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import { LacesAuthTokenService } from "app/services/infrastructure/laces-auth-token.service";

export interface SparqlEndpointAjaxOptions {
    url: string;
    mode: "get" | "post";
    auth: "basic" | "laces" | null;
    username: string;
    password: string;
}

export type SparqlValue = {
    [varName: string]: {
        type: "literal" | "uri";
        value: any;
    };
};

export interface SparqlQueryParameter {
    name: string;
    type: "uri" | "text";
    value: string;
}

export type SparqlQueryParameters = SparqlQueryParameter[];

export interface ISparqlJsonResult {
    head: {
        vars: string[];
    };
    results: {
        distinct: boolean;
        ordered: boolean;
        bindings: SparqlValue[];
    };
}

export abstract class ISparqlExecutor {
    abstract execute(query: string, parameters: SparqlQueryParameters): Promise<ISparqlJsonResult>;
}

export class AjaxSparqlExecutor implements ISparqlExecutor {
    constructor(private options: SparqlEndpointAjaxOptions) {}

    async execute(query: string, parameters: SparqlQueryParameters): Promise<ISparqlJsonResult> {
        for (const param of parameters) {
            const regExp = new RegExp(`\\?${param.name}`, "gi");
            switch (param.type) {
                case "uri":
                    query = query.replace(regExp, `<${param.value}>`);
                    break;
                case "text":
                    query = query.replace(regExp, `"${param.value}"`);
                    break;
            }
        }

        let url = this.options.url;
        const headersObj: { [name: string]: string } = {
            Accept: "application/sparql-results+json"
        };
        let body: string | undefined;

        if (this.options.mode === "get") {
            url = url + "?query=" + this.properEncodeURIComponent(query);
        } else {
            body = query;
            headersObj["Content-Type"] = "application/sparql-query";
        }

        switch (this.options.auth) {
            case "basic":
                headersObj["Authorization"] = this.getBasicAuthToken({
                    username: this.options.username,
                    password: this.options.password
                });
                break;
            case "laces":
                headersObj["Authorization"] = this.getLacesAuthToken({
                    url: url,
                    username: this.options.username,
                    password: this.options.password
                });
                break;
        }

        const response = await fetch(url, {
            mode: "cors",
            method: this.options.mode,
            body: body,
            headers: new Headers(headersObj)
        });

        if (!response.ok) {
            const errorMessage = "Sparql request failed: " + response.statusText;
            throw new Error(errorMessage);
        }

        const result = await response.json();
        this.validateJsonResponse(result);
        //console.log(query);
        //console.log(result);
        return result;
    }

    private getBasicAuthToken(options: { username: string; password: string }) {
        return "Basic " + btoa(options.username + ":" + options.password);
    }

    private getLacesAuthToken(options: { url: string; username: string; password: string }) {
        const tokenGen = new LacesAuthTokenService();
        return tokenGen.createToken({
            url: options.url,
            appId: options.username,
            privateKey: options.password
        });
    }

    private properEncodeURIComponent(s: string): string {
        return encodeURIComponent(s).replace(/'/gi, `%27`);
    }

    private validateJsonResponse(response: ISparqlJsonResult) {
        if (!response.head) {
            throw new Error("Sparql response is missing 'head' property");
        }
        if (!response.head.vars) {
            throw new Error("Sparql response is missing 'head.vars' property");
        }
        if (!response.results) {
            throw new Error("Sparql response is missing 'results' property");
        }
        if (!response.results.bindings) {
            throw new Error("Sparql response is missing 'results.bindings' property");
        }
    }
}

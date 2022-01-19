// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import * as fetch from "isomorphic-fetch";

export interface AjaxOptions {
    noCache?: boolean;
    body?: string;
    method?: "post" | "get";
}

export abstract class IAjaxService {
    abstract getText(url: string, options?: AjaxOptions): Promise<string>;
    abstract getJson<T>(url: string, options?: AjaxOptions): Promise<T>;
}

export class AjaxService implements IAjaxService {
    async getText(url: string, options: AjaxOptions = {}): Promise<string> {
        const response = await fetch(url, {
            credentials: "same-origin",
            method: "get",
            cache: options.noCache ? "no-store" : "default"
        });

        if (response.ok) {
            return response.text();
        }
        console.error("ajax request failed", response.statusText);
        throw new Error(response.statusText);
    }

    async getJson<T>(url: string, options: AjaxOptions = {}): Promise<T> {
        const response = await fetch(url, {
            credentials: "same-origin",
            method: options.method || "get",
            body: options.method == "post" ? options.body : undefined,
            cache: options.noCache ? "no-store" : "default"
        });

        if (response.ok) {
            return response.json();
        }
        console.error("ajax request failed", response.statusText);
        throw new Error(response.statusText);
    }
}

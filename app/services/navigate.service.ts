// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import { appHistory } from "app/services/infrastructure/router-history";
import { BrowsePage } from "app/ui/pages/browse.page";
import { SearchPage } from "app/ui/pages/search.page";

export class NavigateService {
    static getCurrentParameters(): URLSearchParams {
        // TODO: should be retrieved from React router props, see
        // https://medium.freecodecamp.org/hitchhikers-guide-to-react-router-v4-4b12e369d10 .
        const search = appHistory.location.search;
        return new URLSearchParams(search);
    }

    static getCurrentPathname(): string {
        return appHistory.location.pathname;
    }

    static getActionLinkWithParams(action: string, params?: URLSearchParams): string {
        return "#" + action + (params ? "?" + params.toString() : "");
    }

    static retainOnly(params: URLSearchParams | undefined, retainKeys: string[]): URLSearchParams {
        const currentKeys: string[] = [];

        if (params === undefined) {
            return new URLSearchParams();
        }

        const regex = /(^|&)([^=]*)=/g;
        const text = params.toString();
        let match = regex.exec(text);
        while (match) {
            currentKeys.push(match[2]);
            match = regex.exec(text);
        }

        for (const key of currentKeys) {
            if (!retainKeys.includes(key)) {
                params.delete(key);
            }
        }
        return params;
    }

    static setParams(params?: URLSearchParams) {
        const pathname = appHistory.location.pathname;
        const url = NavigateService.getActionLinkWithParams(pathname, params);
        appHistory.push(url);
    }

    /* --- SEARCH --- */

    static getSearchLinkWithParams(params?: URLSearchParams): string {
        return NavigateService.getActionLinkWithParams(SearchPage.PATHNAME, params);
    }

    static getSearchLink(key?: string, options?: any): string {
        const params = NavigateService.getCurrentParameters();
        NavigateService.retainOnly(params, ["source"]);
        if (key) {
            params.set("key", key);
        }
        for (const option in options) {
            params.set(option, options[option]);
        }
        return NavigateService.getSearchLinkWithParams(params);
    }

    static searchWithParams(params?: URLSearchParams) {
        appHistory.push(NavigateService.getSearchLinkWithParams(params));
    }

    static search(key?: string, options?: any) {
        appHistory.push(NavigateService.getSearchLink(key, options));
    }

    /* --- BROWSE / VIEW --- */

    static getBrowseLinkWithParams(params?: URLSearchParams): string {
        params = NavigateService.retainOnly(params, ["source", "uri", "tab"]);
        return NavigateService.getActionLinkWithParams(BrowsePage.PATHNAME, params);
    }

    static getBrowseLink(iri?: string): string {
        const params = NavigateService.getCurrentParameters();
        params.delete("tab");
        params.delete("key");
        params.delete("limit");

        if (!iri || iri == "urn:laces:concept:all") {
            params.delete("uri");
        } else {
            params.set("uri", iri);
        }

        return NavigateService.getBrowseLinkWithParams(params);
    }

    static browseWithParams(params?: URLSearchParams) {
        appHistory.push(NavigateService.getBrowseLinkWithParams(params));
    }

    static browse(iri?: string): void {
        appHistory.push(NavigateService.getBrowseLink(iri));
    }
}

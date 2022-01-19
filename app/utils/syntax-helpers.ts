// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import { RouteComponentProps } from "react-router";

export type DictionaryLike<V> = { [name: string]: V | undefined };

export async function stay(milliseconds: number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(function () {
            resolve();
        }, milliseconds);
    });
}

export async function untilTrue(condition: () => boolean, timeout: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const startTime = new Date().getTime();
        const intervalHandle = setInterval(() => {
            let result = false;
            try {
                result = condition();
            } catch (ex) {
                clearInterval(intervalHandle);
                reject(ex);
            }
            if (result) {
                clearInterval(intervalHandle);
                resolve();
            }
            const timeNow = new Date().getTime();
            if (timeNow > startTime + timeout) {
                clearInterval(intervalHandle);
                reject();
            }
        }, 10);
    });
}

export function getQueryParams(paramNames: string[], props: RouteComponentProps<any>): any {
    const result: any = {};
    for (const paramName of paramNames) {
        const paramValue = getQueryParam(paramName, props);
        if (paramValue) {
            result[paramName] = paramValue;
        }
    }
    return result;
}

export function getQueryParam(
    paramName: string,
    props: RouteComponentProps<any>
): string | undefined {
    const queryParams = parseUrlQuery(props.location.search);
    if (queryParams[paramName]) {
        console.log(paramName + ": " + queryParams[paramName]);
    }
    return queryParams[paramName] || undefined;
}

export function parseUrlQuery(url: string): DictionaryLike<string> {
    const result: DictionaryLike<string> = {};
    const params = new URLSearchParams(url);
    params.forEach(function (value, key) {
        result[key] = value;
    });
    return result;
}

/**
 * Checks that argument is not null or undefined and returns the argument back
 */
export function ensure<S>(value: S | undefined | null, message?: string): S {
    if (value !== null && value !== undefined) {
        return value;
    }
    // Throw catch and rethrow - log error to console with stacktrace.
    try {
        const messageBase = message || "Validation failed";
        if (value === null) {
            throw new Error(messageBase + ": value must not be null");
        }
        if (value === undefined) {
            throw new Error(messageBase + ": value must not be undefined");
        }
        throw new Error(messageBase);
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}

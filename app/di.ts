// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

interface Abstract<T> {
    prototype: T;
}

const container: {
    id: Object;
    implementation: Object;
}[] = [];

export function setupInject<T>(serviceIdentifier: Abstract<T>, implementation: T) {
    const match = container.find((r) => r.id === serviceIdentifier);
    if (match) {
        match.implementation = implementation;
    } else {
        container.push({
            id: serviceIdentifier,
            implementation: implementation
        });
    }
}

export function resolveInject<T>(serviceIdentifier: Abstract<T>): T {
    const match = container.find((r) => r.id === serviceIdentifier);
    if (match) {
        return match.implementation as T;
    }
    throw new Error("Requested binding is not registered in DI container");
}

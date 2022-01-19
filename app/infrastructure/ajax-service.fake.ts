// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import { IAjaxService } from "app/services/infrastructure/ajax-service";
import { stay } from "app/utils/syntax-helpers";

export class FakeAjaxService implements IAjaxService {
    constructor(private fakeObj?: any) {}

    setup(fakeObj: any) {
        this.fakeObj = fakeObj;
    }

    async getText(url: string): Promise<string> {
        await stay(10);
        return this.fakeObj;
    }

    async getJson<T>(url: string): Promise<T> {
        await stay(10);
        return this.fakeObj;
    }
}

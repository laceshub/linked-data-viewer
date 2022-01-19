// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Semmtech B.V.

// Include polyfills to work in PhantomJS
import "core-js";

import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
chai.should();
(window as any).chai = chai;

import * as Enzyme from "enzyme";
import * as EnzymeAdapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Include all TS files except app.tsx
 * This guarantees that all application and spec files will be included
 * We need to include all application files to create coverage report for them
 * Also we need to exclude entry point app.tsx, so it will no trigger while loading scripts in test runner
 */
const req = (require as any).context("../../app/", true, /^(.(?!app\.))*\.tsx?$/);
req.keys().forEach(req);

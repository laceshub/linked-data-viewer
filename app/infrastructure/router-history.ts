// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

/* 
    History currently uses hash in address to ensure the app is loaded.
    Afterwards, the Router takes over and loads the correct page.
    It's possible to do away with the hash through createBrowserHistory.
    This will involve letting the server redirect all initial requests.
    See: https://tylermcginnis.com/react-router-cannot-get-url-refresh/ .
 */

//import { createBrowserHistory as createHistory } from "history";
import { createHashHistory as createHistory } from "history";

export const appHistory = createHistory();

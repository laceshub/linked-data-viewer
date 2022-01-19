// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import * as React from "react";

import { ErrorMessage } from "app/ui/_generic/error-message";

export const ErrorPage = (props: { error: Error }) => {
    const { error } = props;

    return (
        <div className="container">
            <br />
            <br />
            <ErrorMessage error={error} />
        </div>
    );
};

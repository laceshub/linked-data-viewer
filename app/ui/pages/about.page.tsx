// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import * as React from "react";

export const AboutPage = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="one-half column" style={{ marginTop: "25%" }}>
                    <h4>Application information</h4>
                    <p>Build #{build_info.version}</p>
                </div>
            </div>
        </div>
    );
};

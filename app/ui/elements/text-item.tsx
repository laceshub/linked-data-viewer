// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import * as cn from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";
import * as CopyToClipboard from "react-copy-to-clipboard";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import * as uniqid from "uniqid";
/*
 * Component that represents a text item, which may link,
 * be preceded by an icon, carry a badge and/or be highlighted.
 */
export const TextItem = (props: {
    text: string;
    link?: string;
    icon?: string;
    badge?: string;
    highlighted?: boolean;
    onClick?: () => void;
    copyToClipboard?: boolean;
}) => {
    const { text, link, icon, badge, copyToClipboard } = props;
    const uniqId = uniqid();
    const component = link ? (
        <Link
            to={"?uri=" + encodeURIComponent(link)}
            className={cn({ "text-info": props.highlighted })}
            onClick={props.onClick}
        >
            {text}
        </Link>
    ) : copyToClipboard ? (
        <>
            {text}
            <CopyToClipboard text={text}>
                <button id={"CopyPopoverFocus-" + uniqId} className="copy-document-icon" />
            </CopyToClipboard>
            <UncontrolledPopover
                trigger="focus"
                placement="bottom"
                target={"CopyPopoverFocus-" + uniqId}
            >
                <PopoverBody>Copied!</PopoverBody>
            </UncontrolledPopover>
        </>
    ) : (
        text
    );

    return (
        <>
            <span className="mr-auto">
                {icon ? <span className={`text-item-icon ${icon}`} /> : <></>}
                {component}
            </span>
            <span className="text-item-badge badge">{badge}</span>
        </>
    );
};

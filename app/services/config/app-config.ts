// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Sander Stolk and Semmtech B.V.

import { SparqlEndpointAjaxOptions } from "app/services/infrastructure/sparql-executor";

/**
 * These interfaces describe the JSON configuration schema.
 * This schema is defined in the file config.schema.json.
 */
export interface AppConfig {
    dataServiceOptions: SparqlEndpointAjaxOptions;
    queryTerm: string;
    hierarchies: HierarchyConfig[];
    informationPane: InformationPaneConfig;
    startTerm?: string;
    queryOTL: string;
    querySearch: string;
    subtitleHTML?: string;
}

export interface HierarchyConfig {
    id: string;
    name: string;
    icon?: string;
    queryRoots: string;
    queryChildren: string;
    queryBreadcrumbs: string;
}

export interface InformationPaneConfig {
    tabs: TabConfig[];
}

export interface TabConfig {
    type: string;
    id: string;
    name: string;
    icon?: string;
    query: string;
    object?: any;
    hideIfEmpty: boolean;
}

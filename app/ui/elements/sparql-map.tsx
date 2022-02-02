// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Semmtech B.V.

import * as React from "react";

import { Spinner } from "reactstrap";
import { isEqual } from "lodash";
import { resolveInject } from "app/di";
import {
    ISparqlExecutor,
    SparqlQueryParameters
} from "app/services/infrastructure/sparql-executor";
import {
    getRecordValue,
    SparqlRecord,
    SparqlResultParser
} from "app/services/infrastructure/sparql-result-parser";
import { NavigateService } from "app/services/navigate.service";
import { ErrorMessage } from "app/ui/_generic/error-message";
import { FullscreenControl, Map, MapboxOptions, Popup } from "mapbox-gl";
import * as GeoJSON from "geojson";
const Terraformer = require("@terraformer/wkt");
const transformCoordinates = require("@pusky/transform-coordinates");

import "./sparql-map.less";

export interface ISparqlMapState {
    isLoading: boolean;
    data?: FeatureCollections;
    error?: Error;
}

export interface ISparqlMapProps {
    id: string;
    config: MapboxOptions;
    query: string;
    queryParameters: SparqlQueryParameters;
    onLoad?: (entryCount: number) => void;
}

type FeatureCollections = {
    [layerSource: string]: GeoJSON.FeatureCollection;
};

const DEFAULT_STYLE = "mapbox://styles/mapbox/light-v10";
const GEOMETRY_TYPES = [
    "Point",
    "MultiPoint",
    "LineString",
    "MultiLineString",
    "Polygon",
    "MultiPolygon"
];

/*
 * Component that represents a geospatial map.
 */
export class SparqlMap extends React.Component<ISparqlMapProps, ISparqlMapState> {
    private sparqlExecutor = resolveInject(ISparqlExecutor);
    private styleRefs: React.RefObject<HTMLInputElement>[];

    constructor(props: ISparqlMapProps) {
        super(props);
        this.state = {
            isLoading: true
        };
        this.styleRefs = [React.createRef(), React.createRef(), React.createRef()];
    }

    async componentDidMount() {
        await this.loadData(this.props);
    }

    async componentDidUpdate(prevProps: ISparqlMapProps) {
        if (
            prevProps.id != this.props.id ||
            !isEqual(prevProps.config, this.props.config) ||
            prevProps.query != this.props.query ||
            prevProps.queryParameters != this.props.queryParameters
        ) {
            await this.loadData(this.props);
        }
    }

    async loadData(props: ISparqlMapProps): Promise<void> {
        this.setState({ isLoading: true, error: undefined });
        try {
            const result = await this.sparqlExecutor.execute(props.query, props.queryParameters);
            const records = SparqlResultParser.parse(result);
            const geoData = this.parseRecords(records);
            this.setState({ isLoading: false, data: geoData });

            if (props.onLoad) {
                props.onLoad(this.isEmpty() ? 0 : records.length);
                this.loadMap();
            }
        } catch (ex) {
            this.setState({ isLoading: false, error: ex });
        }
    }

    render() {
        if (this.isEmpty()) {
            return <div />;
        }
        if (this.state.isLoading) {
            return <Spinner className="spinner-listing" size="lg" color="primary" />;
        }

        return (
            <>{!this.state.error ? this.renderMap() : <ErrorMessage error={this.state.error} />}</>
        );
    }

    renderMap() {
        return (
            <div id={this.createDivIdMap()} className="mapboxMap">
                <link
                    href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
                    rel="stylesheet"
                />

                <div id={this.createDivIdStyleMenu()} className="mapboxStyleMenu rounded">
                    {this.createStyleOption(
                        "Light",
                        "mapbox://styles/mapbox/light-v10",
                        this.styleRefs[0]
                    )}
                    {this.createStyleOption(
                        "Dark",
                        "mapbox://styles/mapbox/dark-v10",
                        this.styleRefs[1]
                    )}
                    {this.createStyleOption(
                        "Satellite",
                        "mapbox://styles/mapbox/satellite-v9",
                        this.styleRefs[2]
                    )}
                </div>
            </div>
        );
    }

    createStyleOption(label: string, style: string, ref?: React.RefObject<HTMLInputElement>) {
        return (
            <>
                <input
                    id="mapStyle"
                    type="radio"
                    name="rtoggle"
                    value={style}
                    ref={ref}
                    defaultChecked={style == DEFAULT_STYLE}
                />
                <label>{label}</label>
            </>
        );
    }

    createDivIdMap() {
        return this.props.id + "_map";
    }

    createDivIdStyleMenu() {
        return this.props.id + "_stylemenu";
    }

    loadMap() {
        const config = this.props.config;
        config.style = DEFAULT_STYLE;
        config.container = this.createDivIdMap();

        if (!config.accessToken) {
            console.error("Cannot load map. No access token has been provided for Mapbox use.");
        }

        const map = new Map(config);
        map.addControl(new FullscreenControl());

        for (var i = 0; i < this.styleRefs.length; i++) {
            const styleRef = this.styleRefs[i].current;
            if (styleRef) {
                styleRef.onclick = switchMapStyle;
            }
        }

        function switchMapStyle(event: MouseEvent) {
            const target = event.target && (event.target as HTMLInputElement);
            const styleId = target && target.value;
            if (styleId) {
                map.setStyle(styleId);
            }
        }

        map.on("load", () => {
            map.resize();
        });

        map.on("style.load", () => {
            const geoData = this.state.data;
            if (geoData == undefined) {
                return;
            }

            // if no custom layers are used, ensure Points are drawn over Lines & Lines over Polygons
            let layerSources = Object.keys(geoData);
            if (!Object.keys(geoData).some((elem) => !GEOMETRY_TYPES.includes(elem))) {
                layerSources = GEOMETRY_TYPES.slice().reverse();
            }

            // add all layers
            for (const layerSource of layerSources) {
                const collection = geoData[layerSource];
                if (collection == undefined) {
                    continue;
                }

                map.addSource(layerSource, {
                    type: "geojson",
                    data: collection
                });

                switch (layerSource as GeoJSON.GeoJsonTypes) {
                    case "Point":
                    case "MultiPoint":
                        map.addLayer({
                            id: layerSource + "Circle",
                            type: "circle",
                            source: layerSource,
                            paint: {
                                "circle-radius": 5,
                                "circle-color": ["get", "color"]
                            }
                        });
                        this.addPopup(map, layerSource + "Circle");
                        break;

                    case "LineString":
                    case "MultiLineString":
                        map.addLayer({
                            id: layerSource + "Line",
                            type: "line",
                            source: layerSource,
                            layout: {
                                "line-join": "round",
                                "line-cap": "round"
                            },
                            paint: {
                                "line-width": ["to-number", ["get", "thickness"]],
                                "line-color": ["get", "color"]
                            }
                        });
                        this.addPopup(map, layerSource + "Line");
                        break;

                    case "Polygon":
                    case "MultiPolygon":
                        map.addLayer({
                            id: layerSource + "Fill",
                            type: "fill",
                            source: layerSource,
                            paint: {
                                "fill-opacity": 1,
                                "fill-color": ["get", "color"]
                            }
                        });
                        this.addPopup(map, layerSource + "Fill");

                        map.addLayer({
                            id: layerSource + "Line",
                            type: "line",
                            source: layerSource,
                            filter: [">", ["to-number", ["get", "thickness"]], 0],
                            layout: {
                                "line-join": "round",
                                "line-cap": "round"
                            },
                            paint: {
                                "line-width": 1,
                                "line-opacity": 0.2
                            }
                        });
                        break;

                    default:
                        break;
                }
            }
        });

        map.resize();
    }

    addPopup(map: Map, layerId: string) {
        map.on("mouseleave", layerId, () => {
            map.getCanvas().style.cursor = "";
        });
        map.on("mouseenter", layerId, () => {
            map.getCanvas().style.cursor = "pointer";
        });

        map.on("click", layerId, (e) => {
            const coordinates = e.lngLat;
            const feature = e.features && e.features[0];
            const properties = feature?.properties;

            if (!feature || !properties) {
                return;
            }

            const popup = document.createElement("div");

            const divViewURI = document.createElement("div");
            divViewURI.className = "mapboxPopup-divInfo";
            divViewURI.innerHTML =
                "<a class='oi oi-info' href='" +
                "#" +
                NavigateService.getBrowseLink(properties.uri) +
                "'></a>";
            popup.appendChild(divViewURI);

            let divContent = document.createElement("div");
            divContent.className = "mapboxPopup-divContent";
            divContent.innerHTML = properties.label || "";
            popup.appendChild(divContent);

            new Popup({ closeButton: false })
                .setLngLat(coordinates)
                .setDOMContent(popup)
                .addTo(map);
        });
    }

    parseRecords(records: SparqlRecord[]): FeatureCollections {
        const collections: FeatureCollections = {};

        for (const record of records) {
            const entryIRI = getRecordValue(record, "entry_iri");
            const entryText = getRecordValue(record, "entry_text");
            const locationWKT = getRecordValue(record, "location_wkt");
            const locationCRS = getRecordValue(record, "location_crs");
            const locationText = getRecordValue(record, "location_text") || entryText;
            const locationLayer = getRecordValue(record, "location_layer");

            const locationThickness = getRecordValue(record, "location_thickness") || "5";
            const locationHue = getRecordValue(record, "location_hue") || "0";
            const locationSaturation =
                getRecordValue(record, "location_saturation") || (locationHue != "0" ? "70" : "0");
            const locationLightness = getRecordValue(record, "location_lightness") || "50";
            const locationOpacity = getRecordValue(record, "location_opacity") || "1";
            const locationColor =
                getRecordValue(record, "location_color") ||
                "hsla(" +
                    locationHue +
                    "," +
                    locationSaturation +
                    "%," +
                    locationLightness +
                    "%," +
                    locationOpacity +
                    ")";

            const RE_WKT = /\s*(\<(?<projection>.*)\>)?\s*(?<wkt>.*)/g;
            const wktLiteralMatches = RE_WKT.exec(locationWKT);
            if (!(wktLiteralMatches && wktLiteralMatches.groups && wktLiteralMatches.groups.wkt)) {
                // no WKT geometry found; skipping this entry
                continue;
            }

            try {
                const geometry = Terraformer.wktToGeoJSON(
                    wktLiteralMatches.groups.wkt.toUpperCase()
                );
                const defaultCRS = "http://www.opengis.net/def/crs/OGC/1.3/CRS84";
                const projectionURI =
                    wktLiteralMatches.groups.projection || locationCRS || defaultCRS;
                const projection = "EPSG:" + (projectionURI.match(/([0-9]{4,})/g) || "4326"); // assumes EPSG

                const geoJSON: GeoJSON.Feature = {
                    type: "Feature",
                    properties: {
                        uri: entryIRI,
                        label: locationText,
                        color: locationColor,
                        thickness: locationThickness
                    },
                    geometry: this.transformGeometry(geometry, projection, "EPSG:4326")
                };

                const layer = locationLayer || geometry.type;
                if (collections[layer] == undefined) {
                    collections[layer] = { type: "FeatureCollection", features: [] };
                }
                collections[layer].features.push(geoJSON);
            } catch (error) {
                continue;
            }
        }

        return collections;
    }

    transformGeometry(geometry: GeoJSON.Geometry, from: string, to: string) {
        if (from != to) {
            switch (geometry.type) {
                case "Point":
                    geometry.coordinates = transformCoordinates(from, to).forward(
                        geometry.coordinates
                    );
                    break;

                case "LineString":
                case "MultiPoint":
                    for (let x = 0; x < geometry.coordinates.length; x++) {
                        geometry.coordinates[x] = transformCoordinates(from, to).forward(
                            geometry.coordinates[x]
                        );
                    }
                    break;

                case "Polygon":
                case "MultiLineString":
                    for (let x = 0; x < geometry.coordinates.length; x++) {
                        for (let y = 0; y < geometry.coordinates[x].length; y++) {
                            geometry.coordinates[x][y] = transformCoordinates(from, to).forward(
                                geometry.coordinates[x][y]
                            );
                        }
                    }
                    break;

                case "MultiPolygon":
                    for (let x = 0; x < geometry.coordinates.length; x++) {
                        for (let y = 0; y < geometry.coordinates[x].length; y++) {
                            for (let z = 0; y < geometry.coordinates[x][y].length; z++) {
                                geometry.coordinates[x][y][z] = transformCoordinates(
                                    from,
                                    to
                                ).forward(geometry.coordinates[x][y][z]);
                            }
                        }
                    }
                    break;

                default:
                    break;
            }
        }

        return geometry;
    }

    isEmpty(): boolean {
        const featureCollections = this.state.data;
        return !(featureCollections && Object.keys(featureCollections).length > 0);
    }
}

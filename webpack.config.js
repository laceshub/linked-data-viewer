const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const HtmlReplaceWebpackPlugin = require("html-replace-webpack-plugin");

const package = require("./package.json");

const appGitVersion = new GitRevisionPlugin().version();

module.exports = function (env) {
    env = env || {};
    const version =
        env.version || package.version + "-" + new Date().toISOString().replace(/-|:|\.|T|Z/gi, "");
    const isProduction = !!env.prod;
    const isUnitTests = !!env.tests;
    const isDevBuild = !isProduction;
    const isEs5 = isProduction; // If you want to test it locally in IE11 then set it to true
    const configDirectory = env.configDir || "resources/config/default";

    console.log("Building app bundle with webpack");
    console.log("    version: " + version);
    console.log("    production mode: " + isProduction);
    console.log("    tests: " + isUnitTests);
    console.log("    es5: " + isEs5);
    console.log("    configDirectory: " + configDirectory);

    const webpackConfig = {
        mode: isProduction ? "production" : "development",
        entry: {
            app: isUnitTests ? "./app/tests/all-tests.spec.ts" : "./app/app.tsx"
        },

        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            modules: [__dirname, "node_modules"]
        },

        output: {
            path: path.join(__dirname, "/dist/html")
        },

        optimization: {
            splitChunks: isUnitTests ? false : { chunks: "all", automaticNameDelimiter: "-" }
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    options: {
                        compilerOptions: {
                            target: isEs5 ? "es5" : "ES2017"
                        }
                    }
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg|woff)$/,
                    loader: "url-loader",
                    options: { limit: 20000 }
                },
                { test: /\.(html|txt|sparql)$/, loader: "raw-loader" },
                { test: /\.css$/, loaders: ["style-loader", "css-loader"] },
                { test: /\.less$/, loaders: ["style-loader", "css-loader", "less-loader"] }
            ]
        },

        plugins: [
            new CleanWebpackPlugin(["dist", "reports"], { verbose: true }),

            new CopyWebpackPlugin([
                { from: "static", to: "static" },
                { from: configDirectory + "/queries", to: "queries" },
                { from: configDirectory + "/config.json", to: "config.json" },
                { from: "node_modules/flag-icon-css/css", to: "static/flag-icon-css/css/" },
                { from: "node_modules/flag-icon-css/flags", to: "static/flag-icon-css/flags/" }
            ]),

            new HtmlWebpackPlugin({
                template: isUnitTests ? "app/tests/index.ejs" : "app/index.ejs",
                filename: "index.html"
            }),

            new webpack.DefinePlugin({
                // This is custom inlined object to pass build version to application
                build_info: JSON.stringify({
                    version: appGitVersion
                })
            }),

            // Replace html contents with string or regex patterns
            new HtmlReplaceWebpackPlugin([
                {
                    pattern: "@@version",
                    replacement: version
                }
            ]),

            isProduction &&
                new BundleAnalyzerPlugin({
                    // Can be `server`, `static` or `disabled`.
                    // In `server` mode analyzer will start HTTP server to show bundle report.
                    // In `static` mode single HTML file with bundle report will be generated.
                    // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
                    analyzerMode: "static",
                    // Path to bundle report file that will be generated in `static` mode.
                    // Relative to bundles output directory.
                    reportFilename: path.join(__dirname, "reports/bundle-analyzer-app-report.html"),
                    // Automatically open report in default browser
                    openAnalyzer: false,
                    // If `true`, Webpack Stats JSON file will be generated in bundles output directory
                    generateStatsFile: false,
                    // Log level. Can be 'info', 'warn', 'error' or 'silent'.
                    logLevel: "info"
                })
        ].filter((x) => !!x),

        stats: { modules: false },
        performance: { hints: false },
        devServer: {
            contentBase: path.join(__dirname, "dist/html"),
            port: isUnitTests ? 8092 : 8091
        },
        devtool: isDevBuild ? "eval-source-map" : false
    };

    return webpackConfig;
};

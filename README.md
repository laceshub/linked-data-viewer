# Laces - Linked Data Viewer

## Getting Started

These are the fundamental technologies used in the infrastructure of the application:
* [Typescript](https://www.typescriptlang.org/) is a superset of JavaScript.
* [React](https://facebook.github.io/react/) is a UI rendering library.
* [Less](http://lesscss.org/) is a CSS preprocessor.
* [Webpack](https://webpack.js.org/) is a module bundler tool.
* [Mocha](https://mochajs.org/) is a unit test runner and [Chai](http://chaijs.com/).
  is an assertion library for unit tests.
* [NodeJS](https://nodejs.org/en/) javascript engine is used to execute.
  various tools in a build toolchain like `npm`, `typescript`, `webpack`, `less` and others.
* [Npm](https://www.npmjs.com/) is used as a package manager and build tasks executor.
* [Yarn](https://yarnpkg.com/) is used as an alternative to `npm` and provides
  faster installs and consistent versioning thanks to `yarn.lock` file.

Next to these technologies, the following frameworks were used for visualization purposes:
* [Reactstrap](https://reactstrap.github.io/) is a React library for working with [Bootstrap](https://getbootstrap.com/) front-end components. (MIT license)
* [Flag-icon-css](https://github.com/lipis/flag-icon-css) is used for flag images. (MIT license)
* [Open Iconic](https://useiconic.com/open/) is used for icons used in tabs. (MIT license)

To be able to build the application you should have NodeJS (with npm)
and Yarn installed (latest stable versions are preferrable) and be available in your path.
Then different commands are responsible for following tasks:

| Command                         | Description                                                                                                                                 |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `yarn` or `npm install`         | Installs required packages from NPM repository                                                                                              |
| `npm run build` or `yarn build` | Builds production ready version, ready for deployment. Result in `dist` folder.                                                             |
| `npm start` or `yarn start`     | Executes webpack dev web server on `8091` port where you can open the application.                                                          |
| `npm test` or `yarn test`       | Executes [Karma](https://karma-runner.github.io/) test runner to run unit tests and also generates code coverage report in `reports` folder |

### IDE

It is recommended to use [VSCode](https://code.visualstudio.com/)
as source code editor and debugger. It is lightweight, free to use and open
source text editor initially forked from [Atom](https://atom.io/) and
maintained by Microsoft. Main features are out of the box Typescript support.

#### Debugging in your web browser

Thanks to enabled source maps it is possible to debug your typescript
code in browser. To do that please open developer tools panel,
then navigate to "Sources" area. There you should see tree-view
with files structure. Please expand this path:
`webpack:///` -> `.` -> `app` -> `app.tsx`.
You should see the source code of `app.tsx` entry point of application.
You can put break points in it and debug the same way as usual javascript.

#### Debugging in Visual Studio Code

Embedded debugger is one of the greatest features of VSCode.
The projectalready has a debugger configuration in `.vscode\launch.json`.
The debugger uses the [Chrome remote debugging protocol](https://chromedevtools.github.io/debugger-protocol-viewer/),
which requires having the following extension installed: [Debugger for Chrome](https://github.com/Microsoft/vscode-chrome-debug). Moreover, the project debugger configuration expects
[Chrome Canary](https://www.google.com/chrome/browser/canary.html) to be installed as well,
with remote debugger enabled on port `9222`. More info about this extension usage and
configuration is avalaible on [github page](https://github.com/Microsoft/vscode-chrome-debug).

### Directory structure

* `config`
    * `config.schema.json` - Configuration file [Json schema](https://spacetelescope.github.io/understanding-json-schema/index.html).
      The default configuration is located not in this directory but in "../resources/configs/default", unless specified otherwise through the param `configDir` (processed by `webpack.config.js`).
* `app` - Application source code folder.
    * `services` - Contains services such as config and data loader.
        * `infrastructure` - Contains infrastructure services such as ajax and sparql loaders.
    * `ui` - Contains React UI components.
        * `pages` - Contains the main pages.
        * `sections` - Contains sections for a page (e.g., hierarchy, breadcrumbs, etc).
        * `tabs` - Contains tabs used within a section (i.e., the information pane).
        * `elements` - Contains smaller components used within sections and tabs (e.g., listing and text item).
    * `utils` - Contains utility functions for various needs.
    * `tests`
        * `all-tests.spec.ts` - Entry point for webpack to collect all source
          files in application including unit tests. We need to include ALL
          source files in order to create test code coverage report even
          for not covered files.
        * `tests-index.ejs` - HTML template for webpack. Is used to provide
          default Mocha Web UI for unit tests on `localhost:8091\tests.html`.
    * `app.tsx` - Entry point of application, used also by Webpack to build the application.
    * `index.ejs` - HTML template for webpack, used for the main page container.
* `static` - Static content folder copied directly to the web-server. Contains fonts, images and CSS styles.
* `tools`
    * `make-war.js` - Creates a WAR file ready to be deployed to a Tomcat web server.

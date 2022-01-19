/**
 * Require function is used by webpack to build dependencies
 *  */
declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;

    /**
     * Webpack require.context https://webpack.github.io/docs/context.html
     * You can create your own context with the require.context function.
     * It allow to pass a directory, regular expression and a flag if subdirectories should be used too.
     */
    context: (directory: string, useSubdirectories: boolean, matchingExpression: RegExp) => any;
};

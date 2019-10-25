const path = require('path');

module.exports = {
    webpackConfig: {
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
            ],
        },
    },
    components: 'packages/*/src/**/*.tsx',
    title: 'Resizin JS StyleGuide',
    exampleMode: 'expand',
    usageMode: 'expand',
    getComponentPathLine(componentPath) {
        const name = path.basename(componentPath, '.tsx');
        const pkgName = componentPath.split(path.sep)[1];
        return `import { ${name} } from '${pkgName}'`;
    },
};

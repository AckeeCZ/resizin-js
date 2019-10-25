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
    updateExample(props) {
        return {
            ...props,
            content: props.content.replace('../src', 'react-resizin'),
        };
    },
};

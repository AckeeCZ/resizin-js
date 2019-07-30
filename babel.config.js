module.exports = {
    presets: ['@babel/typescript', '@babel/env'],
    plugins: [
        '@babel/proposal-class-properties',
        '@babel/proposal-object-rest-spread',
        [
            require.resolve('babel-plugin-transform-imports'),
            {
                lodash: {
                    transform: 'lodash/${member}',
                    preventFullImport: true,
                },
            },
        ],
    ],
    ignore: ['**/__tests__/', 'packages/**/*.d.ts'],
};

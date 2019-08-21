const sharedSettings = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    globals: {
        'ts-jest': {
            diagnostics: false,
        },
    },
};

module.exports = {
    testPathIgnorePatterns: ['/node_modules', '/lib'],
    setupFilesAfterEnv: ['./configure-jest.js'],
    // https://gist.github.com/thebuilder/15a084f74b1c6a1f163fc6254ad5a5ba
    projects: [
        {
            displayName: 'dom',
            testEnvironment: 'jsdom',
            testMatch: ['**/packages/!(node-*)/**/__tests__/**/*.test.ts?(x)'],
            ...sharedSettings,
        },
        {
            displayName: 'node',
            testEnvironment: 'node',
            testMatch: ['**/packages/node-*/**/__tests__/**/*.test.ts'],
            ...sharedSettings,
        },
    ],
};

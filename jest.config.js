const sharedSettings = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    coveragePathIgnorePatterns: ['/node_modules/', '/lib/'],
    globals: {
        'ts-jest': {
            diagnostics: false,
        },
    },
};

module.exports = {
    testPathIgnorePatterns: ['/node_modules', '/lib'],
    // https://gist.github.com/thebuilder/15a084f74b1c6a1f163fc6254ad5a5ba
    projects: [
        {
            displayName: 'dom',
            testEnvironment: 'jsdom',
            testMatch: ['**/packages/!(node-*)/**/__tests__/**/*.test.ts?(x)'],
            setupFilesAfterEnv: ['<rootDir>/configure-jest.ts'],
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

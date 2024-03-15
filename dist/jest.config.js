"use strict";
module.exports = {
    rootDir: '.',
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
    roots: ['<rootDir>/src'],
    testEnvironment: 'node',
    preset: 'ts-jest',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testPathIgnorePatterns: ['/node_modules/'],
    testMatch: ['<rootDir>/src/**/*.test.(ts|tsx|js|jsx)'],
    verbose: true,
};
//# sourceMappingURL=jest.config.js.map
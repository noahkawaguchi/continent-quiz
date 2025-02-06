import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Simulates a browser-like environment
  moduleNameMapper: {
    '^.+\\.css$': 'identity-obj-proxy', // Mock CSS modules
    '^@/(.*)$': '<rootDir>/src/$1', // Alias `@` to `src/`
  },
  setupFiles: ['jest-localstorage-mock'],
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts',
    '@testing-library/jest-dom'
  ], // Add setup files
};

export default config;

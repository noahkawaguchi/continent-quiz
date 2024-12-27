import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Simulates a browser-like environment
  moduleNameMapper: {
    '^.+\\.css$': 'identity-obj-proxy', // Mock CSS modules
    '^@/(.*)$': '<rootDir>/src/$1', // Alias `@` to `src/`
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Add setup files
};


// import type { Config } from 'jest';

// const config: Config = {
//   preset: 'ts-jest',
//   testEnvironment: 'jest-environment-jsdom',
//   // moduleNameMapper: {
//   //   '^@components/(.*)$': '<rootDir>/src/components/$1',
//   //   '^@utils/(.*)$': '<rootDir>/src/utils/$1',
//   // },
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
// };

export default config;

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Simulates a browser-like environment
  moduleNameMapper: {
    '^.+\\.css$': 'identity-obj-proxy', // Mock CSS modules
    '^@/(.*)$': '<rootDir>/src/$1', // Alias `@` to `src/`
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Add setup files
};

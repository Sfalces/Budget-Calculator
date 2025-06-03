const { createDefaultPreset } = require('ts-jest')

const tsJestTransformCfg = createDefaultPreset().transform

/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    ...tsJestTransformCfg
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^@(.*)/(.*)$': '<rootDir>/node_modules/@$1/$2',
    '^core/(.*)$': '<rootDir>/src/core/$1',
    '^ui/(.*)$': '<rootDir>/src/ui/$1',
    '^_di/(.*)$': '<rootDir>/src/_di/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  }
}

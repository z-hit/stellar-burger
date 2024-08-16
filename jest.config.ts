import { pathsToModuleNameMapper, type JestConfigWithTsJest } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const jestConfig: JestConfigWithTsJest = {
  verbose: true,
  bail: false,
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  transform: {
    preset: 'ts-jest',
    '^.+\\.tsx?$': ['ts-jest', {}]
  },
  testPathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/node_modules/',
    '<rootDir>/dist/'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  }),
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.[jt]s?(x)',
    '<rootDir>/src/**/*(*.)@(spec|test).[tj]s?(x)'
  ]
  //testRegex: '.*/src/.*\\.test\\.(t|j)sx?$'
};

export default jestConfig;

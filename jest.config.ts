import { pathsToModuleNameMapper, type JestConfigWithTsJest } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const jestConfig: JestConfigWithTsJest = {
  verbose: true,
  transform: {
    preset: 'ts-jest',
    '^.+\\.tsx?$': ['ts-jest', {}]
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  })
};

export default jestConfig;

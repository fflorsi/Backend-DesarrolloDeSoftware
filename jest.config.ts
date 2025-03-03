export default{
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts','js'],
  transform:{
    '^.+\\.ts$':'ts-jest',
  },
  testMatch: ['**/*.test.ts'],
  moduleNameMapper: {
    '(\\.{1,2}/.*)\\.js$':'$1'
  }
}
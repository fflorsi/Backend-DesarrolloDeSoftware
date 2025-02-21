export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest', // Transforma archivos TypeScript
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'], // Extensiones de archivo que Jest debe reconocer
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignora las carpetas de node_modules y dist
};
/* eslint-disable @typescript-eslint/no-require-imports */
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './' // Caminho do seu projeto Next.js
});

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Configuração de ambiente
  testEnvironment: 'jest-environment-jsdom', // Definir o ambiente de teste
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>[/\\\\](node_modules|.next)[/\\\\]',
    '<rootDir>/.jest/test-utils.tsx',
    '<rootDir>/__mocks__/*'
  ],
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  },
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^lucide-react$': '<rootDir>/__mocks__/lucide-react.js',
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$': `<rootDir>/__mocks__/fileMock.js`,
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/lib(.*)$': '<rootDir>/src/lib$1',
    '^@/hooks(.*)$': '<rootDir>/hooks$1',
    '^@/mocks(.*)$': '<rootDir>/__mocks__$1',
    '^@/tests(.*)$': '<rootDir>/.jest$1',
    '^next/image$': '<rootDir>/__mocks__/image.js'
  }
};

// Criar configuração final do Jest
module.exports = createJestConfig(customJestConfig);

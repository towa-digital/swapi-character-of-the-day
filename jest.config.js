const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  // Add more custom configurations if needed
};

module.exports = createJestConfig(customJestConfig);

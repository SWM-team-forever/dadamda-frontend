module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ["<rootDir>/client/node_modules/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg)$": "jest-transform-stub"
  },
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
};
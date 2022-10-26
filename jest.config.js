/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  roots: ['<rootDir>/tests'],
  preset: "ts-jest",
  testEnvironment: "node",
  coverageProvider: "babel",
  setupFiles: ["<rootDir>/tests/setup.ts"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts", "<rootDir>/test/**/*.ts"],
  transform: {
    "^.+\\.(j|t)s?$": "ts-jest",
  },
  moduleNameMapper: {
    "@/tests/(.*)": "<rootDir>/tests/$1",
    "@/(.*)": "<rootDir>/src/$1",
  },
};

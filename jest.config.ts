import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        darkTheme: true,
        openReport: true,
        failureMessageOnly: 2,
        includeConsoleLog: true,
        publicPath: "reports",
      },
    ],
  ],
};

export default createJestConfig(config);

import { createDefaultEsmPreset } from "ts-jest";

/** @type {import('ts-jest').JestConfigWithTsJest} */
const jestConfig = {
	displayName: "type-module",
	...createDefaultEsmPreset({
		tsconfig: "tsconfig-esm.json",
	}),
	setupFilesAfterEnv: ["<rootDir>/setup.ts"],
	moduleNameMapper: {
		"^mongodb$": "<rootDir>/__mocks__/mongodb.js",
	},
};

export default jestConfig;

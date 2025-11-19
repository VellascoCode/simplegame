import process from "node:process";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import nextPlugin from "@next/eslint-plugin-next";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";
import js from "@eslint/js";
import globals from "globals";

if (typeof globalThis.structuredClone !== "function") {
  globalThis.structuredClone = (value) => JSON.parse(JSON.stringify(value));
}

const abortSignalKey = "AbortSignal";
const abortSignalCtor = typeof globalThis[abortSignalKey] !== "undefined" ? globalThis[abortSignalKey] : null;
if (abortSignalCtor && typeof abortSignalCtor.prototype.throwIfAborted !== "function") {
  abortSignalCtor.prototype.throwIfAborted = function throwIfAborted() {
    if (this.aborted) {
      const error = new Error("Operation was aborted");
      error.name = "AbortError";
      throw error;
    }
  };
}

const tsRules = tsPlugin.configs["recommended-type-checked"].rules;
const nextRules = nextPlugin.configs["core-web-vitals"].rules;

export default [
  {
    ignores: ["node_modules", ".next", "maps", "maps-data", "public/tester", "legacy", "app/play-legacy"]
  },
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd()
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        React: true,
        JSX: true
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "@next/next": nextPlugin,
      "react-hooks": reactHooks
    },
    rules: {
      ...tsRules,
      ...nextRules,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            arguments: false,
            attributes: false
          }
        }
      ]
    }
  },
  {
    files: ["next.config.js", "postcss.config.js"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        project: null
      },
      globals: globals.node
    }
  },
  {
    files: ["lib/authOptions.ts", "lib/authSession.ts", "app/api/auth/\\[...nextauth\\]/route.ts"],
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-member-access": "off"
    }
  },
  prettier
];

// eslint.config.js
import process from "node:process";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import nextPlugin from "@next/eslint-plugin-next";
import reactHooks from "eslint-plugin-react-hooks";
import react from "eslint-plugin-react";
import perfectionist from "eslint-plugin-perfectionist";
import prettier from "eslint-config-prettier";
import js from "@eslint/js";
import globals from "globals";

// Polyfills (mantidos)
if (typeof globalThis.structuredClone !== "function") {
  globalThis.structuredClone = (value) => JSON.parse(JSON.stringify(value));
}

// Regras base
const tsRules = tsPlugin.configs["recommended-type-checked"].rules;
const nextRules = nextPlugin.configs["core-web-vitals"].rules;

export default [
  { ignores: ["node_modules", ".next", "out", "build", "public"] },

  js.configs.recommended,

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        React: true,
        JSX: true,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "@next/next": nextPlugin,
      "react-hooks": reactHooks,
      react,
      perfectionist,
    },
    rules: {
      ...tsRules,
      ...nextRules,

      // React
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/react-in-jsx-scope": "off",
      "react/self-closing-comp": "error",

      // TypeScript rigor máximo
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports", fixStyle: "inline-type-imports" }],
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: { arguments: false } }],
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // PERFECTIONIST – CONFIGURAÇÃO QUE NUNCA QUEBRA (2025)
      "perfectionist/sort-imports": [
        "error",
        {
          type: "natural",
          order: "asc",
          groups: [
            "type",
            ["builtin", "external"],
            "internal-type",
            "internal",
            ["parent-type", "sibling-type", "index-type"],
            ["parent", "sibling", "index"],
            "side-effect",
            "object",
            "unknown",
          ],
          newlinesBetween: "always",
          // REMOVIDO internalPattern → é a causa do erro!
          // O perfectionist já detecta automaticamente @/ e ~/ se estiver no tsconfig
        },
      ],
      "perfectionist/sort-named-imports": "error",
      "perfectionist/sort-exports": "error",
      "perfectionist/sort-named-exports": "error",
    },
  },

  // Arquivos JS de configuração
  {
    files: ["next.config.*", "postcss.config.*", "tailwind.config.*", "middleware.ts"],
    languageOptions: { globals: globals.node },
  },

  // PRETTIER SEMPRE NO FINAL
  prettier,
];
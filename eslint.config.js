import js from "@eslint/js";
import globals from "globals";
import reactRefresh from "eslint-plugin-react-refresh";
import tsEslint from "typescript-eslint";
import react from "eslint-plugin-react";
import stylistic from "@stylistic/eslint-plugin";

export default tsEslint.config(
    {ignores: ["dist"]},
    {
        extends: [
            js.configs.recommended,
            ...tsEslint.configs.recommended,
        ],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            "@stylistic": stylistic,
            "react-refresh": reactRefresh,
            react,
        },
        rules: {
            ...react.configs.recommended.rules,
            ...react.configs["jsx-runtime"].rules,
            "@stylistic/indent": ["error", 2],
            "@typescript-eslint/ban-ts-comment": ["off"],
            "react-refresh/only-export-components": [
                "warn",
                {
                    allowConstantExport: true,
                },
            ],
            "@stylistic/object-curly-newline": [
                "error",
                {
                    multiline: true,
                    minProperties: 5,
                    consistent: true,
                },
            ],
            "@stylistic/object-curly-spacing": ["error", "always"],
            "@stylistic/semi": ["error", "always"],
            "@stylistic/quotes": [
                "error",
                "double",
                {
                    "allowTemplateLiterals": true,
                },
            ],
            "@typescript-eslint/no-empty-object-type": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    "argsIgnorePattern": "^_",
                    "varsIgnorePattern": "^_",
                    "caughtErrorsIgnorePattern": "^_",
                },
            ],
        },
        settings: {
            react: {
                version: "18.3",
            },
        },
    });

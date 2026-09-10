import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        files: ['**/*.ts'],
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommendedTypeChecked,
        ],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser,
            },
            parserOptions: {
                projectService: true,
            },
        },
        rules: {
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-misused-promises': 'error',
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
            'eqeqeq': ['error', 'always'],
            'no-duplicate-imports': 'error',
            'no-unreachable': 'error',
            'no-console': 'warn',
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],
            '@typescript-eslint/require-await': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/restrict-template-expressions': 'off',
            '@typescript-eslint/no-base-to-string': 'off',
        },
    },
    {
        files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
        extends: [js.configs.recommended],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
]);

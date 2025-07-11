import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sortDestructreKeys from 'eslint-plugin-sort-destructure-keys';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      turbo: turboPlugin,
      'sort-destructure-keys': sortDestructreKeys,
      'sort-keys-fix': sortKeysFix,
      'simple-import-sort': simpleImportSort,
      prettier: eslintPluginPrettier,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'turbo/no-undeclared-env-vars': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'sort-keys-fix/sort-keys-fix': ['error', 'asc', { caseSensitive: false }],
      'sort-destructure-keys/sort-destructure-keys': [
        'error',
        { caseSensitive: false },
      ],
      'prettier/prettier': 'error',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "MemberExpression[object.name='process'][property.name='env']",
          message:
            'Direct access to process.env is not allowed. Use the typed `src/infrastructure/config/env.ts` instead.',
        },
      ],
      'no-console': [
        'error',
        {
          allow: ['warn', 'error', 'info'],
        },
      ],
    },
  },
  {
    ignores: ['dist/**'],
  },
];

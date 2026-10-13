/**
 * ESLint flat configuration for an Angular project written in TypeScript.
 *
 * TypeScript source files use ESLint's recommended rules, TypeScript ESLint's
 * recommended and stylistic rules, Angular's TypeScript rules, and Prettier.
 * Angular HTML templates use Angular's recommended template and accessibility
 * rules.
 */

// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = tseslint.config(
  /**
   * Rules for TypeScript files, including inline Angular templates.
   *
   * The Angular processor extracts and lints templates declared in component
   * decorators. Component and directive selectors must use the `app` prefix
   * and follow Angular naming conventions. Prettier formatting differences are
   * reported as ESLint errors.
   */
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    plugins: {
      prettier: prettierPlugin,
    },
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      'prettier/prettier': 'error', // Enforce Prettier formatting as lint errors
    },
  },
  /**
   * Rules for standalone Angular HTML templates.
   *
   * These rules validate Angular template syntax and accessibility concerns.
   */
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);

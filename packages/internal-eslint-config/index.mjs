import globals from 'globals';
import eslintJs from '@eslint/js';
import eslintTs from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';

// ----------------------------------------------------------------------

/**
 * Custom ESLint rules configuration.
 */
const customRules = {
  /**
   * Common rules from 'react', 'typescript' and 'eslint-plugin-react-hooks'.
   */
  common: {
    ...reactHooksPlugin.configs.recommended.rules,
    'func-names': 1,
    'no-bitwise': 2,
    'object-shorthand': 1,
    'no-useless-rename': 1,
    'default-case-last': 2,
    'consistent-return': 2,
    'no-constant-condition': 1,
    'default-case': [2, { commentPattern: '^no default$' }],
    'lines-around-directive': [2, { before: 'always', after: 'always' }],
    'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: false }],
    // react
    'react/jsx-key': 0,
    'react/display-name': 0,
    'react/no-children-prop': 0,
    'react/self-closing-comp': 2,
    'react/react-in-jsx-scope': 0,
    'react/jsx-no-useless-fragment': [1, { allowExpressions: true }],
    'react/jsx-curly-brace-presence': [2, { props: 'never', children: 'never' }],
    // typescript
    '@typescript-eslint/no-shadow': 2,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-empty-object-type': 0,
    '@typescript-eslint/consistent-type-imports': 1,
    '@typescript-eslint/no-unused-vars': [1, { args: 'none' }],
  },
  /**
   * Import rules from 'eslint-plugin-import'.
   */
  importPlugin: {
    ...importPlugin.configs.recommended.rules,
    'import/named': 0,
    'import/default': 0,
    'import/namespace': 0,
    'import/no-named-as-default': 0,
    'import/newline-after-import': 2,
    'import/no-named-as-default-member': 0,
    'import/no-cycle': [
      2,
      { maxDepth: '∞', ignoreExternal: false, allowUnsafeDynamicCyclicDependency: false },
    ],
  },
  /**
   * Unused imports rules from 'eslint-plugin-unused-imports'.
   */
  unusedImportsPlugin: {
    'unused-imports/no-unused-imports': 1,
    'unused-imports/no-unused-vars': [
      0,
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
  },
  /**
   * Sort imports/exports rules from 'eslint-plugin-perfectionist'.
   */
  sortImportsPlugin: () => {
    const customGroups = {
      mui: ['custom-mui'],
      minimals: ['custom-minimals'],
      private: ['custom-private'],
      auth: ['custom-auth'],
      hooks: ['custom-hooks'],
      utils: ['custom-utils'],
      types: ['custom-types'],
      routes: ['custom-routes'],
      sections: ['custom-sections'],
      components: ['custom-components'],
    };

    return {
      'perfectionist/sort-named-imports': [1, { order: 'asc', type: 'line-length' }],
      'perfectionist/sort-named-exports': [1, { order: 'asc', type: 'line-length' }],
      'perfectionist/sort-exports': [1, { order: 'asc', type: 'line-length' }],
      'perfectionist/sort-imports': [
        2,
        {
          order: 'asc',
          ignoreCase: true,
          type: 'line-length',
          environment: 'node',
          maxLineLength: undefined,
          newlinesBetween: 'always',
          internalPattern: ['src/**'],
          groups: [
            'style',
            'side-effect',
            'type',
            ['builtin', 'external'],
            customGroups.mui,
            customGroups.minimals,
            customGroups.private,
            customGroups.routes,
            customGroups.hooks,
            customGroups.utils,
            'internal',
            customGroups.components,
            customGroups.sections,
            customGroups.auth,
            customGroups.types,
            ['parent', 'sibling', 'index'],
            ['parent-type', 'sibling-type', 'index-type'],
            'object',
            'unknown',
          ],
          customGroups: {
            value: {
              [customGroups.mui]: '@mui/**',
              [customGroups.minimals]: '@minimals/**',
              [customGroups.private]: 'internal-ui/**',
              [customGroups.auth]: 'src/auth/**',
              [customGroups.hooks]: 'src/hooks/**',
              [customGroups.utils]: 'src/utils/**',
              [customGroups.types]: 'src/types/**',
              [customGroups.routes]: 'src/routes/**',
              [customGroups.sections]: 'src/sections/**',
              [customGroups.components]: 'src/components/**',
            },
          },
        },
      ],
    };
  },
};

/**
 * Custom ESLint configuration.
 */
export const customConfig = {
  plugins: {
    'react-hooks': reactHooksPlugin,
    'unused-imports': unusedImportsPlugin,
    perfectionist: perfectionistPlugin,
    import: importPlugin,
  },
  settings: {
    react: { version: 'detect' },
    // https://www.npmjs.com/package/eslint-import-resolver-typescript
    ...importPlugin.configs.typescript.settings,
    'import/resolver': {
      ...importPlugin.configs.typescript.settings['import/resolver'],
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  rules: {
    ...customRules.common,
    ...customRules.importPlugin,
    ...customRules.unusedImportsPlugin,
    ...customRules.sortImportsPlugin(),
  },
};

// ----------------------------------------------------------------------

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  },
  {
    ignores: [
      // build
      '**/build/*',
      '**/dist/*',
      '**/public/*',
      '**/out/*',
      '**/.next/*',
      '**/node_modules/*',
      // src
      '**/setupTests.*',
      '**/jsconfig.json',
      '**/service-worker.*',
      '**/reportWebVitals.*',
      '**/serviceWorkerRegistration.*',
      // prettier
      '**/.prettier.*',
      '**/prettier.config.*',
      // next
      '**/next.config.*',
      // vite
      '**/vite.config.*',
      // tailwind
      '**/postcss.config.*',
      '**/tailwind.config.*',
      // craco
      '**/craco.config.*',
    ],
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    settings: { react: { version: 'detect' } },
  },
  eslintJs.configs.recommended,
  ...eslintTs.configs.recommended,
  reactPlugin.configs.flat.recommended,
  customConfig,
];

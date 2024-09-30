// @ts-check

/** @type {import("syncpack").RcFile} */

const config = {
  versionGroups: [
    { dependencies: ['@types/node'], packages: ['**'], pinVersion: '^22.5.1' },
    { dependencies: ['@types/react'], packages: ['**'], pinVersion: '^18.3.7' },
    { dependencies: ['typescript'], packages: ['**'], pinVersion: '^5.5.4' },
    { dependencies: ['react'], packages: ['**'], pinVersion: '^18.3.1' },
    { dependencies: ['react-dom'], packages: ['**'], pinVersion: '^18.3.1' },
    { dependencies: ['prettier'], packages: ['**'], pinVersion: '^3.3.3' },
    {
      label: 'Use workspace protocol when developing local packages',
      dependencies: ['$LOCAL'],
      dependencyTypes: ['dev', 'prod'],
      pinVersion: 'workspace:*',
    },
    {
      label: 'Use workspace protocol when developing local packages',
      dependencies: ['$LOCAL'],
      dependencyTypes: ['overrides'],
      pinVersion: '$eslint',
    },
  ],
};

module.exports = config;

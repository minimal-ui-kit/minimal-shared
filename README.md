# Minimal Shared

Share some packages used for Minimal UI and Zone UI built on Turborepo.

## Getting Started

Run the following command:

```sh
cd my-turborepo
```

## Development and Build

```sh
# To develop all apps and packages, run the following command:
pnpm dev
# To build all apps and packages, run the following command:
pnpm build
# clean
pnpm clean
# lint
pnpm lint
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `@minimals/utils`: utils library
- `@minimals/hooks`: hooks library
- `internal-eslint-config`: `eslint` configurations used throughout the monorepo
- `internal-ts-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

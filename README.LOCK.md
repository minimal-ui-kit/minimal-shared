##### Publish to NPM with GitHub Actions

https://www.youtube.com/watch?v=H3iO8sbvUQg

---

###### Create and update changelog

**Step 1:**

```sh
pnpm changeset
```

**Step 2:** Choose packages

```sh
#  Which packages should have a major bump?
Version 1.0.0 => 2.0.0
# Which packages should have a minor bump?
Version 1.0.0 => 1.1.0
# The following packages will be patch bumped
Version 1.0.0 => 1.0.1
```

**Step 3:** Is this your desired changeset? (Y/n)

```sh
# true: Apply
# false: Cancel
```

**Step 4:** Check before publishing (Build & Update changelog)

```sh
pnpm pre:release
```

**Step 5:** Publish on npm

```sh
Push code to Github (Github actions)
# Or (We recommend `release` so that it doesn't conflict with npm's built-in `publish` script.)
# pnpm release
```

---

###### How to add dependency to PNPM workspace?

```sh
# Using the exact package name
pnpm add <package_to_add> --filter <workspace_name>
# Or using a pattern
pnpm add <package_to_add> --filter <prefix>/*
# Add dependency for all workspaces
pnpm add typescript@5.5.4 -r
# Add dependency for all workspaces except repo '@repo/typescript-config'
pnpm add typescript@5.4.5 -r --filter '!@repo/typescript-config'
# Keeping dependencies on the same version
# https://turbo.build/repo/docs/crafting-your-repository/managing-dependencies#keeping-dependencies-on-the-same-version
pnpm up --recursive typescript@latest

pnpm up --recursive typescript@5
```

###### How to clear cache?

```sh
pnpm store prune
```

###### Export package

```json
// package.json
// https://github.com/vercel/turborepo/discussions/612
  "publishConfig": {
    "directory": "src"
  },
// Or
  "exports": {
    ".": "./src/index.ts",
    "./utils": "./src/utils/index.ts",
    "./utils/*": "./src/utils/index.ts",
    "./hooks": "./src/hooks/index.ts",
    "./hooks/*": "./src/hooks/index.ts",
    "./components": "./src/components/index.ts",
    "./components/*": "./src/components/index.ts"
  },
```

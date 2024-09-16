##### Publish to NPM with GitHub Actions

https://www.youtube.com/watch?v=H3iO8sbvUQg

---

###### Create and update changelog

**Step 1:**

```sh
npx changeset add
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
npm run pre:publish
```

**Step 5:** Publish on npm

```sh
Push code to Github (Github actions)
# Or
# npm run publish
```

TEST 1
TEST 2

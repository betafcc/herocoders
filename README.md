# Herocoders

In truth, for a simple task like this, I'd do a single deno script file:

```ts
#!/usr/bin/env -S deno run -A

// -- data extraction
const HOST = 'https://herocoders.atlassian.net/rest/api/3'

const [components, search] = await Promise.all([
  fetch(`${HOST}/project/SP/components`).then(r => r.json()),
  fetch(`${HOST}/search?jql=project=SP`).then(r => r.json()),
])

// -- data normalization
const table = search.issues.flatMap(issue =>
  // linearize by component
  issue.fields.components.map(component => ({
    issue,
    component,
    project: issue.fields.project,
  }))
)

// -- data analysis
// id of components without lead
const woLead = new Set(components.filter(c => !c.lead).map(c => c.id))

const result = table
  .filter(row => row.project.key === 'SP' && woLead.has(row.component.id))
  // looks scary but it's a standard `groupby` in reducer form
  .reduce((acc, next) => {
    const cid = next.component.id
    if (!(cid in acc)) acc[cid] = 0
    acc[cid] += 1
    return acc
  }, {})

// -- formatted output
console.table(
  Object.entries(result).map(([k, v]) => ({
    component: components.find(c => c.id === k).name,
    issues: v,
  }))
)
// ┌───────┬───────────────────┬────────┐
// │ (idx) │ component         │ issues │
// ├───────┼───────────────────┼────────┤
// │     0 │ "Synchronization" │      2 │
// │     1 │ "Backend"         │      1 │
// │     2 │ "Templates"       │      5 │
// └───────┴───────────────────┴────────┘
```

As overengineering a simple task is anti-[yagni](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it), and a mark of a <s>Java programmer</s> bad engineer.


But to show off some 'production-level' good practices, I will do a complete boilerplate, with the features:

- formatting
- linting
- testing
- docs
- github pages
- github hooks for ci
- github hooks for npm publish on merge main

## Boilerplate

For quick 'production-level' code, I tend to use [tsdx](https://tsdx.io/),
so I don't worry about building for 1000 of environments correctly and I just need to tweak a bit the default configuration

```sh
npx tsdx create herocoders-node
```

If I give it a bit more time, I add some elements commonly used by libs on the [fp-ts ecossytem](https://gcanti.github.io/fp-ts/ecosystem/)

```sh
npm i --save-dev prettier prettier-plugin-jsdoc docs-ts
```

Plus a [personal script](./scripts/release.bash) for making release easier, by automating git tagging, package.json version updating, and avoid triggering redundant github actions

I also tend to do exploration-development by using either node notebooks or a [scratch folder](./scratch), to be run on watch with the npm script:

```sh
npm run ts-node-dev ./scratch/jam.ts
```

And lastly, [extension recommendations](./.vscode/extensions.json) so people don't get crazy with inconsistent workflow per developer, while still having the freedom to use their own preferences

## Dev-Workflow

Each developer can clone this repository and develop a feature under a feature branch:

```
git clone git@github.com:betafcc/herocoders
cd herocoders
git checkout -b feat/ds-123/my-ticket-feature
```

When it's done, the code can be pushed to origin and create PR, that will trigger github hooks to run some steps to allow the PR to be merged to main


When a PR is merged to main, other github hooks will run to publish the package to npm directly from the repository
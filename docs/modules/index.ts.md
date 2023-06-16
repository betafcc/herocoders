---
title: index.ts
nav_order: 2
parent: Modules
---

## index overview

**Example**

```ts
import { main } from '@betafcc/herocoders'
main()
```

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [extract](#extract)
  - [main](#main)

---

# utils

## extract

**Signature**

```ts
export declare const extract: (
  api: Api,
  project: string
) => Promise<Record<string | number, { component: string; issues: number }>>
```

## main

**Signature**

```ts
export declare const main: () => Promise<void>
```

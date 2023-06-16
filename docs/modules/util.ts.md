---
title: util.ts
nav_order: 3
parent: Modules
---

## util overview

**Example**

```ts
import { groupby } from '@betafcc/herocoders/util'
groupby(
  (e) => e[0],
  [
    [0, 'a'],
    [0, 'b'],
    [1, 'c'],
  ]
)
// {
//   "0": [ [ 0, "a" ], [ 0, "b" ] ],
//   "1": [ [ 1, "c" ] ]
// }
```

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [apply](#apply)
  - [groupby](#groupby)

---

# utils

## apply

**Signature**

```ts
export declare const apply: <T, R>(
  f: (xs: T[], key: string | number) => R,
  groups: Record<string | number, T[]>
) => Record<string | number, R>
```

**Example**

```ts
import { apply } from '@betafcc/herocoders/util'
apply((xs) => xs.length, {
  '0': [
    [0, 'a'],
    [0, 'b'],
  ],
  '1': [[1, 'c']],
})
// { "0": 2, "1": 1 }
```

## groupby

**Signature**

```ts
export declare const groupby: <T>(key: (x: T) => string | number, xs: T[]) => Record<string | number, T[]>
```

**Example**

```ts
import { groupby } from '@betafcc/herocoders/util'
groupby(
  (e) => e[0],
  [
    [0, 'a'],
    [0, 'b'],
    [1, 'c'],
  ]
)
// {
//   "0": [ [ 0, "a" ], [ 0, "b" ] ],
//   "1": [ [ 1, "c" ] ]
// }
```

---
title: Api.ts
nav_order: 1
parent: Modules
---

## Api overview

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Api (class)](#api-class)
    - [create (static method)](#create-static-method)
    - [components (method)](#components-method)
    - [search (method)](#search-method)
  - [Components (type alias)](#components-type-alias)
  - [Search (type alias)](#search-type-alias)
  - [api](#api)
  - [defaultHost](#defaulthost)

---

# utils

## Api (class)

**Signature**

```ts
export declare class Api {
  constructor(readonly get: (enpoint: string) => Promise<unknown>)
}
```

### create (static method)

Utility that uses a default fetch implementation and fetches from the
provided `host`

**Signature**

```ts
static create(host: string)
```

### components (method)

Retrieves a list of components for `project` along with the fields
describing them (e.g., 'component lead')

**Signature**

```ts
components(project: string)
```

### search (method)

Retrieve a list of issues for `project` along with the fields describing
them (e.g., 'components')

**Signature**

```ts
search(project: string)
```

## Components (type alias)

**Signature**

```ts
export type Components = {
  self: string
  id: string
  name: string
  assigneeType: string
  realAssigneeType: string
  isAssigneeTypeValid: boolean
  project: string
  projectId: number
  lead?: {
    self: string
    accountId: string
    avatarUrls: { [key: string]: string }
    displayName: string
    active: boolean
  }
}
```

## Search (type alias)

**Signature**

```ts
export type Search = {
  expand: string
  startAt: number
  maxResults: number
  total: number
  issues: Array<{
    expand: string
    id: string
    self: string
    key: string
    fields: {
      project: {
        self: string
        id: string
        key: string
        name: string
        projectTypeKey: string
        simplified: boolean
        avatarUrls: { [key: string]: string }
      }
      components: Array<{
        self: string
        id: string
        name: string
        iconUrl?: string
        description?: string
      }>
      // I don't care about other fields for this task
      [x: string]: unknown
    }
  }>
}
```

## api

**Signature**

```ts
export declare const api: Api
```

## defaultHost

**Signature**

```ts
export declare const defaultHost: 'https://herocoders.atlassian.net/rest/api/3'
```

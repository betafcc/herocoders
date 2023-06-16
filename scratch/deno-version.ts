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

// Synchronization: 2
// Backend: 1
// Templates: 5

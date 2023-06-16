import components from '../test/mock/components.json'
import search from '../test/mock/search.json'

// // these are the components without lead
// console.log(components.filter((c) => !c.lead).map((c) => [c.id, c.name]))

const grouped = new Map(
  components.filter(c => !c.lead).map(c => [c.id, [] as any])
)
console.log(grouped)

// issues from this project
const issues = search.issues.filter(i => i.fields.project.key === 'SP')
// console.log(issues)

const table = issues.flatMap(issue =>
  issue.fields.components.map(component => ({ issue, component }))
)

const counts = table.reduce((acc, next) => {
  const cid = next.component.id
  if (!grouped.has(cid)) return acc

  if (!(cid in acc)) acc[cid] = 0
  acc[cid] += 1
  return acc
}, {})

console.log(counts)

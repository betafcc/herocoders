/**
 * @example
 *   import { main } from '@betafcc/herocoders'
 *   main()
 */
import * as util from './util'
import { Api, api } from './Api'

export const extract = async (api: Api, project: string) => {
  const [components, search] = await Promise.all([
    api.components(project),
    api.search(project),
  ])

  const table = search.issues.flatMap(issue =>
    // linearize by component
    issue.fields.components.map(component => ({
      issue,
      component,
      project: issue.fields.project,
    }))
  )

  const woLead = new Set(components.filter(c => !c.lead).map(c => c.id))

  const filtered = table.filter(
    row => row.project.key === project && woLead.has(row.component.id)
  )

  const grouped = util.groupby(e => e.component.id, filtered)

  return util.apply(
    (xs, k) => ({
      component: components.find(c => c.id === k)!.name,
      issues: xs.length,
    }),
    grouped
  )
}

export const main = async () => {
  await extract(api, 'SP').then(console.table)
  /*
  ┌─────────┬───────────────────┬────────┐
  │ (index) │     component     │ issues │
  ├─────────┼───────────────────┼────────┤
  │  10128  │ 'Synchronization' │   2    │
  │  10130  │     'Backend'     │   1    │
  │  10131  │    'Templates'    │   5    │
  └─────────┴───────────────────┴────────┘
  */
}

import { Api, api } from './Api'

export const extract = async (api: Api, project: string) => {
  const componentsWoLead = await api
    .components(project)
    .then(r => r.filter(c => !c.lead).map(c => c.name))

  const counts = await Promise.all(
    componentsWoLead.map(componentName => api.countBy(project, componentName))
  )

  return counts.map((total, i) => ({
    component: componentsWoLead[i],
    issues: total,
  }))
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

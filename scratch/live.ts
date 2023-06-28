import { api } from '../src/Api'

api
  .countBy('SP', 'Templates')
  // .then(r => r.total)
  // .then(r => JSON.stringify(r, null, 2))
  .then(console.log) //.then(r => r.total).then(console.log)

// import { fetch } from 'cross-fetch'

// const HOST = 'https://herocoders.atlassian.net/rest/api/3'
// const PROJECT = 'SP'

// const main = async () => {
//   // 1 - query the components api for the components wo leads
//   // - assume not having a 'lead' json-field means 'not having a lead'
//   const woLead = (
//     await fetch(`${HOST}/project/${PROJECT}/components`).then(r => r.json())
//   )
//     .filter(c => !c.lead)
//     .map(c => c.name)

//   // 2 - get the `name` of those

//   console.log(woLead)
// }

// // 3 - query for each `name` the number of issues realated to that
// // - use jql for filtering

// main()

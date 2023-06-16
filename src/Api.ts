import { fetch } from 'cross-fetch'

// -- Typing section

// Even in production-level code,
// I avoid creating a bunch of files for no reason,
// That's why I put the typings directly here,
// this way, if I change name of a field or something simple like that,
// I don't need to jump tabs like a maniac (or a Nest.js user)

// Quickly generated by copying example data and pasting
// using `quicktype.quicktype` extension, then tweaking

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

// -- Implementation section

export class Api {
  /**
   * Utility that uses a default fetch implementation and fetches from the
   * provided `host`
   */
  static create(host: string) {
    return new Api(enpoint => fetch(host + enpoint).then(r => r.json()))
  }

  // The constructor is parametrized on the function that does the fetching.
  // This way is easier to mock for test or to hoist control of external
  // variables like which fetching lib to use or control rate-limiting etc
  //
  // In OOP paradigm, this would be the 'D' in 'SOLID' (I guess? idk)
  // In FP paradigm, this would be the...
  // nothing, this would be just obvious
  constructor(readonly get: (enpoint: string) => Promise<unknown>) {
    // I ALWAYS use empty constructor, to achieve pure instantiation.
    // Convenient initialization code (possibly impure) should be done on static methods
    // this way is way easier to test
  }

  /**
   * Retrieves a list of components for `project` along with the fields
   * describing them (e.g., 'component lead')
   */
  components(project: string) {
    return this.get(`/project/${project}/components`) as Promise<
      Array<Components>
    >
    // if we were super strict, we should be parsing the response
    // but what was asked is 'production-level' and not 'scientific-paper-haskell-level'
  }

  /**
   * Retrieve a list of issues for `project` along with the fields describing
   * them (e.g., 'components')
   */
  search(project: string) {
    const params = new URLSearchParams()
    params.set('jql', `project=${project}`)

    return this.get(`/search?${params}`) as Promise<Search>
  }
}

// -- Misc and util section

export const defaultHost = 'https://herocoders.atlassian.net/rest/api/3'

// since construction is pure,
// we can provide a default instance without this
// line breaking in any environment
export const api = Api.create(defaultHost)

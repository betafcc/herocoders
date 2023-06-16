import { extract } from '../src'
import { Api } from '../src/Api'

import components from './mock/components.json'
import search from './mock/search.json'

describe('extract', () => {
  it('works', async () => {
    // no need to fancy mock
    const api = new Api((enpoint: string) =>
      Promise.resolve(
        enpoint.startsWith('/project')
          ? components
          : enpoint.startsWith('/search')
          ? search
          : null
      )
    )

    expect(await extract(api, 'SP')).toEqual({
      '10128': { component: 'Synchronization', issues: 2 },
      '10130': { component: 'Backend', issues: 1 },
      '10131': { component: 'Templates', issues: 5 },
    })
  })
})

import * as util from '../src/util'

describe('groupby', () => {
  it('works', () => {
    expect(
      util.groupby<[number, string]>(
        e => e[0],
        [
          [0, 'a'],
          [0, 'b'],
          [1, 'c'],
        ]
      )
    ).toEqual({
      '0': [
        [0, 'a'],
        [0, 'b'],
      ],
      '1': [[1, 'c']],
    })
  })
})

describe('apply', () => {
  it('works', () => {
    expect(
      util.apply(xs => xs.length, {
        '0': [
          [0, 'a'],
          [0, 'b'],
        ],
        '1': [[1, 'c']],
      })
    ).toEqual({ '0': 2, '1': 1 })
  })
})

/**
 * @example
 *   groupby(
 *     e => e[0],
 *     [
 *       [0, 'a'],
 *       [0, 'b'],
 *       [1, 'c'],
 *     ]
 *   )
 *   // {
 *   //   "0": [ [ 0, "a" ], [ 0, "b" ] ],
 *   //   "1": [ [ 1, "c" ] ]
 *   // }
 */
export const groupby = <T>(key: (x: T) => string | number, xs: Array<T>) =>
  xs.reduce((acc, next) => {
    const k = key(next)
    if (!(k in acc)) acc[k] = []
    acc[k].push(next)
    return acc
  }, {} as Record<string | number, Array<T>>)

/**
 * @example
 *   apply(xs => xs.length, {
 *     '0': [
 *       [0, 'a'],
 *       [0, 'b'],
 *     ],
 *     '1': [[1, 'c']],
 *   })
 *   // { "0": 2, "1": 1 }
 */
export const apply = <T, R>(
  f: (xs: Array<T>, key: string | number) => R,
  groups: Record<string | number, Array<T>>
): Record<string | number, R> =>
  Object.fromEntries(
    Object.entries(groups).map(([k, v]) => [k, f(v, k)] as const)
  )

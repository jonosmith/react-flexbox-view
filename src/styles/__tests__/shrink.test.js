/* global describe it */

import expect from 'expect'
import { shrink } from '../index'

describe('shrink()', () => {
  it('Generates a flex-shrink style when only valid numbers are provided', () => {
    expect(shrink('2')).toContain('flex-shrink: 2;')
    expect(shrink('invalid')).toEqual('')
  })

  it('Sets flex-shrink to 0 when boolean false is provided', () => {
    const result = shrink(false)
    expect(result).toContain('flex-shrink: 0;')
  })

  it('Sets flex-shrink to 1 when boolean true is provided', () => {
    const result = shrink(true)
    expect(result).toContain('flex-shrink: 1;')
  })
})

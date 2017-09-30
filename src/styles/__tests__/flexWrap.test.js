/* global describe it */

import expect from 'expect'
import { flexWrap } from '../index'

describe('flexWrap()', () => {
  it('Sets flex-wrap to "wrap" when boolean true is provided', () => {
    expect(flexWrap(true)).toContain('flex-wrap: wrap;')
  })

  it('Sets flex-wrap to "nowrap" when boolean false is provided', () => {
    expect(flexWrap(false)).toContain('flex-wrap: nowrap;')
  })

  it('Sets flex-wrap to "wrap-reverse" when "reverse" is provided', () => {
    expect(flexWrap('reverse')).toContain('flex-wrap: wrap-reverse;')
  })

  it('Passes other values through', () => {
    expect(flexWrap('wrap-reverse')).toContain('flex-wrap: wrap-reverse;')
    expect(flexWrap('inherit')).toContain('flex-wrap: inherit;')
  })
})

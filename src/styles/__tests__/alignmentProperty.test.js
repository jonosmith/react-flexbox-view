/* global describe it */

import expect from 'expect'
import { alignmentProperty } from '../index'

describe('alignmentProperty()', () => {
  it('Prepends "flex-" when "start" or "end" shortcuts are provided', () => {
    const result = alignmentProperty('align-content', 'start')
    expect(result).toContain('align-content: flex-start')
  })

  it('Passes other values straight through', () => {
    const result = alignmentProperty('align-content', 'center')
    expect(result).toContain('align-content: center')
  })
})

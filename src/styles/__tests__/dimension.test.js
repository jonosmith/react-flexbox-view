/* global describe it */

import expect from 'expect'
import { dimension } from '../index'

describe('dimension()', () => {
  it('Converts fractions to percentages', () => {
    const result = dimension('width', { value: 1 / 4 })
    expect(result).toContain('width: 25%;')
  })

  it('Sets the dimension to 100% if the "fit" shortcut is true', () => {
    const result = dimension('width', { fit: true })
    expect(result).toContain('width: 100%;')
  })
})

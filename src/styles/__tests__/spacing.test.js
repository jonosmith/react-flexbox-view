/* global describe it */

import expect from 'expect'
import { SPACING_SCALE } from '../../constants'
import { spacing } from '../index'

describe('spacing()', () => {
  it('Generates a spacing style', () => {
    const result = spacing('margin-left', '24px')
    expect(result).toContain('margin-left: 24px;')
  })

  describe('Scale shortcuts', () => {
    it('Uses the shortcut present in the provided scale', () => {
      const result = spacing('margin-left', 'small', SPACING_SCALE)
      expect(result).toContain(`margin-left: ${SPACING_SCALE.small};`)
    })

    it('Uses the "regular" scale value when boolean true is provided', () => {
      const result = spacing('margin-left', true, SPACING_SCALE)
      expect(result).toContain(`margin-left: ${SPACING_SCALE.regular};`)
    })

    describe('Nested scales', () => {
      it('Finds the margin shortcut in a nested scale object', () => {
        const scales = {
          margin: SPACING_SCALE,
        }

        const result = spacing('margin-left', 'small', scales)
        expect(result).toContain(`margin-left: ${scales.margin.small};`)
      })

      it('Finds the padding shortcut in a nested scale object', () => {
        const scales = {
          padding: SPACING_SCALE,
        }

        const result = spacing('padding-left', 'large', scales)
        expect(result).toContain(`padding-left: ${scales.padding.large};`)
      })
    })
  })
})

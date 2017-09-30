/* global describe it */

import dedent from 'dedent-js'
import expect from 'expect'
import { BREAKPOINTS } from '../../constants'
import {
  compact,
  isBreakpointOnly,
  nextBreakpointValue,
  responsiveIdentifier,
  responsiveIdentifierWithoutOnly,
  stripResponsiveIdentifier,
} from '../../utils'
import { flexDirection } from '../index'

describe('flexDirection()', () => {
  it('Returns an empty string when no arguments provided', () => {
    const result = flexDirection()
    expect(result).toEqual('')
  })

  it('Sets direction column when the "column" argument is true', () => {
    const result = flexDirection({ column: true })
    expect(result).toContain('flex-direction: column')
  })

  it('Sets direction row when the "row" argument is true', () => {
    const result = flexDirection({ column: false, row: true })
    expect(result).toContain('flex-direction: row')
  })

  it('Sets direction to "row-reverse" when the "row" argument is "reverse"', () => {
    const result = flexDirection({ column: false, row: 'reverse' })
    expect(result).toContain('flex-direction: row-reverse')
  })

  it('Sets direction to "row-reverse" when the "column" argument is "reverse"', () => {
    const result = flexDirection({ column: 'reverse' })
    expect(result).toContain('flex-direction: column-reverse')
  })

  describe('Responsive props', () => {
    const BREAKPOINT_KEYS = Object.keys(BREAKPOINTS)

    function testBreakpoint(direction, value) {
      it(`Generates correct CSS for ${direction} = "${value}"`, () => {
        const result = flexDirection({ [direction]: value, breakpoints: BREAKPOINTS })

        expectedStyles(direction, value).forEach(computedExpectedStyle => {
          expect(result).toContain(computedExpectedStyle)
        })
      })
    }

    function expectedStyles(direction, value) {
      return compact(value.split(' ').map(subValue => expectedStyle(direction, subValue)))
    }

    function expectedStyle(direction, value) {
      const rawValue = stripResponsiveIdentifier(value)
      const breakpointKey = responsiveIdentifierWithoutOnly(value)
      const fromSize = BREAKPOINTS[breakpointKey]
      const expectedFlexDirectionValue = `flex-direction: ${direction +
        (rawValue ? '-' + rawValue : '')} !important;`

      if (isBreakpointOnly(responsiveIdentifier(value))) {
        const nextBreakpoint = nextBreakpointValue(breakpointKey, BREAKPOINTS)
        if (!nextBreakpoint) return

        const toSize = nextBreakpoint - 1

        return dedent(`
          @media only screen and (min-width: ${fromSize}px) and (max-width: ${toSize}px) {
            ${expectedFlexDirectionValue}
          }
        `)
      }

      return dedent(`
        @media only screen and (min-width: ${fromSize}px) {
          ${expectedFlexDirectionValue}
        }
      `)
    }

    BREAKPOINT_KEYS.forEach(breakpointKey => {
      testBreakpoint('column', breakpointKey)
      testBreakpoint('column', breakpointKey + '-reverse')
      testBreakpoint('column', breakpointKey + 'Only-reverse')

      testBreakpoint('row', breakpointKey)
      testBreakpoint('row', breakpointKey + '-reverse')
      testBreakpoint('row', breakpointKey + 'Only-reverse')
    })

    describe('Multiple values', () => {
      testBreakpoint('column', 'smOnly lgOnly')
      testBreakpoint('column', 'smOnly mdOnly lgOnly-reverse')
    })
  })
})

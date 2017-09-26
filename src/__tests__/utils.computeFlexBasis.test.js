/* global describe it */

import dedent from 'dedent-js';
import expect from 'expect'
import { computeFlexBasis } from '../utils'

const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
}

const GRID_SIZE = 12

function assertHasStyles(options, expectedStyles) {
  const outputStyles = computeFlexBasis({ breakpoints: BREAKPOINTS, ...options })
  expect(outputStyles).toContain(expectedStyles)
}

describe('computeFlexBasis()', () => {
  it('Returns an empty string when no arguments are provided', () => {
    const outputStyles = computeFlexBasis()
    expect(outputStyles).toEqual('')
  })

  it('Sets flex-basis when a "basis" prop is provided', () => {
    assertHasStyles({ basis: '200px;' }, 'flex-basis: 200px;')
  })

  it('Sets box-sizing to "border-box" when any styles are computed', () => {
    assertHasStyles({ basis: '200px;' }, 'box-sizing: border-box;')
  })

  it('Sets flex-basis to a percentage when a fraction is provided', () => {
    assertHasStyles({ basis: 1/4 }, 'flex-basis: 25%;')
  })

  it('Sets flex-basis to the correct percentage when "basis" is a number and "gridSize" is provided', () => {
    assertHasStyles({ basis: 5, gridSize: GRID_SIZE }, `flex-basis: ${(5 / GRID_SIZE) * 100}%;`)
  })

  describe('Responsive props', () => {
    function getNextBreakpointValue(breakpointKey) {
      const breakpointValue = BREAKPOINTS[breakpointKey]

      const breakpointValues = Object.values(BREAKPOINTS)
      const breakpointPosition = breakpointValues.indexOf(breakpointValue)
      const nextBreakpointPosition = breakpointPosition + 1;

      if (nextBreakpointPosition < breakpointValues.length) {
        return breakpointValues[nextBreakpointPosition]
      }

      return undefined
    }

    function computeExpectedStyle(size) {
      return `flex-basis: ${(size * 100)}% !important;`
    }

    function testBreakpoint(breakpointKey, size) {
      it(`Generates a media query for the correct size for the ${breakpointKey} prop`, () => {
        const fromSize = BREAKPOINTS[breakpointKey]

        assertHasStyles({ [breakpointKey]: size }, dedent(`
          @media only screen and (min-width: ${fromSize}px) {
            ${computeExpectedStyle(size)}
          }
        `))
      })
    }

    function testBreakpointOnly(breakpointKey, size) {
      const nextBreakpoint = getNextBreakpointValue(breakpointKey)
      if (nextBreakpoint) {
        it(`Generates a media query for the correct size for the ${breakpointKey}Only prop`, () => {
          const propName = `${breakpointKey}Only`
          const fromSize = BREAKPOINTS[breakpointKey]
          const toSize = nextBreakpoint - 1
          assertHasStyles({ [propName]: size }, dedent(`
            @media only screen and (min-width: ${fromSize}px) and (max-width: ${toSize}px) {
              ${computeExpectedStyle(size)}
            }
          `))
        })
      }
    }

    for (const breakpointKey in BREAKPOINTS) {
      testBreakpoint(breakpointKey, 1/2)
      testBreakpointOnly(breakpointKey, 1/2)
    }
  })
})

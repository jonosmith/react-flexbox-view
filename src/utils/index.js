import dedent from 'dedent-js'

import { BREAKPOINT_ONLY_IDENTIFIER, RESPONSIVE_IDENTIFIER_PATTERN } from '../constants'

//-------------------------------------------------------------------------------------------------
// 3RD PARTY UTILS
//-------------------------------------------------------------------------------------------------

export * from './lodash'

//-------------------------------------------------------------------------------------------------
// OTHER UTILS
//-------------------------------------------------------------------------------------------------

/**
 * For the given breakpoint key, get the value of the next breakpoint up
 *
 * @param {string} breakpointKey - eg. sm, md, lg etc.
 * @param {Object} breakpoints - A breakpoint mapping object eg. { xs: 0, sm: 576 }
 * @returns {number|undefined} - The next breakpoint value. Undefined if there is none
 */
export function nextBreakpointValue(breakpointKey, breakpoints) {
  const currentBreakpointValue = breakpoints[breakpointKey]

  const breakpointValues = Object.values(breakpoints)
  const currentBreakpointPosition = breakpointValues.indexOf(currentBreakpointValue)
  const nextBreakpointPosition = currentBreakpointPosition + 1

  if (nextBreakpointPosition < breakpointValues.length) {
    return breakpointValues[nextBreakpointPosition]
  }

  return undefined
}

/**
 * Generates a CSS media query with the given breakpoint
 *
 * NOTE: Closure function. Makes use of tagged template literals to pass the CSS content
 * to be wrapped in the media query in an elegant way
 *
 * @example
 *  breakpoint('sm', { xs: 0, sm: 576, ... })`
 *    color: red;
 *  `
 *  >>>
 *  "@media (min-width: 576px) {
 *      color: red;
 *  }"
 *
 * @param {String} breakpoint - The breakpoint for the media query
 * @param {Object} breakpoints - A mapping of pixel breakpoints by breakpoint name
 * @returns Function - A tagged template literal function
 */
export function breakpoint(breakpoint, breakpoints) {
  return (strings, ...values) => {
    const content = strings.reduce((accumulator, current, index) => {
      accumulator += current

      if (values.hasOwnProperty(index)) {
        accumulator += String(values[index])
      }

      return accumulator
    }, '')

    const breakpointValue = breakpoints[breakpoint.replace(BREAKPOINT_ONLY_IDENTIFIER, '')]

    const minWidth = `(min-width: ${breakpointValue}px)`

    let maxWidth = ''
    if (isBreakpointOnly(breakpoint)) {
      const breakpointValues = Object.values(breakpoints)
      const currentBreakpointPosition = breakpointValues.indexOf(breakpointValue)
      const nextBreakpointPosition =
        currentBreakpointPosition > -1 &&
        breakpointValues[currentBreakpointPosition + 1] &&
        currentBreakpointPosition + 1

      if (nextBreakpointPosition) {
        const nextBreakpointValue = breakpointValues[nextBreakpointPosition] - 1
        maxWidth = `(max-width: ${nextBreakpointValue}px)`
      }
    }

    const computedMedia = maxWidth ? `${minWidth} and ${maxWidth}` : minWidth
    return dedent(`
      @media only screen and ${computedMedia} {
        ${dedent(content)}
      }
    `)
  }
}

/**
 * Determines if the given breakpoint key is an "Only" type breakpoint eg. smOnly
 *
 * @param {string} breakpointKey - eg. sm, mdOnly
 * @returns {boolean} - True if the given breakpoint key is
 */
export function isBreakpointOnly(breakpointKey) {
  const pattern = `${BREAKPOINT_ONLY_IDENTIFIER}$`
  return !!breakpointKey.match(new RegExp(pattern))
}

/**
 * Determines if the given string has a responsive identifier or not
 *
 * @param {string} string - The string to check eg. sm-row, lg-space-around
 * @returns {boolean} - True if the given prop is responsive or not
 */
export function hasResponsiveIdentifier(string) {
  return !!String(string).match(RESPONSIVE_IDENTIFIER_PATTERN)
}

/**
 * Removes any responsive prefixes from the given string
 *
 * @example
 *  stripResponsiveIdentifier('sm-row')
 *  > "row"
 *
 * @param {string} string - The string to remove any responsive identifiers from eg. sm-row
 * @return {string} - The string with removed responsive identifiers
 */
export function stripResponsiveIdentifier(string) {
  return string.replace(RESPONSIVE_IDENTIFIER_PATTERN, '')
}

/**
 * Extracts the responsive identifier from the string if it has one
 *
 * @example
 *  responsiveIdentifier('sm-row')
 *  > "sm"
 *
 *  responsiveIdentifier('mdOnly-column')
 *  > "mdOnly"
 *
 * @param {string} string - The string to get the identifier from eg. sm-row, lg-space-around
 * @returns {string} - The responsive identifier, or an empty string if none exists
 */
export function responsiveIdentifier(string) {
  const matches = string.match(RESPONSIVE_IDENTIFIER_PATTERN)
  if (!matches) return ''

  const trailingHyphen = /-$/
  return (matches[0] || '').replace(trailingHyphen, '')
}

/**
 * Extracts a responsive identifier from a string if it has one, also removing the "Only" identifier
 *
 * @example
 *  responsiveIdentifierWithoutOnly('smOnly-row')
 *  > "sm"
 *
 * @param {string} string - The string to get the identifier from eg. smOnly-row
 * @returns {string} - The responsive identifier, or an empty string if none exists
 */
export function responsiveIdentifierWithoutOnly(string) {
  return responsiveIdentifier(string).replace(BREAKPOINT_ONLY_IDENTIFIER, '')
}

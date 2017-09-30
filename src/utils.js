import dedent from 'dedent-js'
import { forEach, get, isBoolean, isNumber, isString } from 'lodash'
import {
  BREAKPOINT_PROPS,
  RESPONSIVE_IDENTIFIER_PATTERN,
  SHORTCUTS,
  BREAKPOINT_ONLY_IDENTIFIER,
} from './constants'

/**
 * Parses and converts any shortcuts for a given sizing type property (width, height, flex-basis
 * etc.)
 *
 * @param {string|number} size - A given size property. Can be a number (fraction or grid size
 * value) or valid CSS length value
 * @param {number} [divideNumbersBy] - Optional. If given a number, will divide it by this amount
 * before converting to a percentage
 * @return {*} - The parsed size
 */
function computeSize(size, divideNumbersBy = 1) {
  // Check for a shortcut
  const shortcut = SHORTCUTS[String(size).toLowerCase()]
  if (shortcut) return shortcut

  if (isNumber(size)) {
    // Convert number to a percentage if required
    if (divideNumbersBy) return `${size / divideNumbersBy * 100}%`

    // Assume pixels otherwise
    return `${size}px`
  }

  // If got to here, just return given value
  return size
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
 *
 * @param breakpointKey
 * @returns {boolean}
 */
export function isBreakpointOnly(breakpointKey) {
  const pattern = `${BREAKPOINT_ONLY_IDENTIFIER}$`
  return !!breakpointKey.match(new RegExp(pattern))
}

/**
 * Determines if the given string has a responsive identifier or not
 *
 * @param {String} string - The string to check eg. sm-row, lg-space-around
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

export function computeFlexWrap(wrap) {
  let value = ''
  if (isBoolean(wrap)) {
    value = wrap ? 'wrap' : 'nowrap'
  } else if (wrap === 'reverse') {
    value = 'wrap-reverse'
  }

  return value ? `flex-wrap: ${value};` : ''
}

/**
 * Used to work out the flex-direction value for the "column" and "row" props
 *
 * @param {boolean|string} column - eg. 'sm', 'smOnly', 'md-reverse'
 * @param {boolean|string} row - eg. 'sm', 'smOnly', 'md-reverse'
 * @param {Object} breakpoints - A breakpoint mapping object eg. { xs: 0, sm: 576 }
 * @returns {string} - Computed styles
 */
export function computeFlexDirection({ column, row, breakpoints } = {}) {
  if (!column && !row) return ''

  const computedStyles = []
  forEach({ column, row }, (value, direction) => {
    if (!value) return

    if (isBoolean(value)) {
      computedStyles.push(`flex-direction: ${direction};`)
    } else if (isString(value)) {
      value.split(' ').forEach(subValue => {
        computedStyles.push(computeFlexDirectionStringValue(subValue, direction, breakpoints))
      })
    }
  })

  return computedStyles.join('\n')
}

/**
 * Computes the flex-direction styles for the given string value
 *
 * @param {string} value - eg. 'reverse', 'sm', 'mdOnly', 'smOnly lgOnly'
 * @param {string} direction - Either 'column' or 'row'
 * @param {Object} breakpoints - A breakpoint mapping object eg. { xs: 0, sm: 576 }
 * @returns {string} - Computed styles
 */
function computeFlexDirectionStringValue(value, direction, breakpoints) {
  const rawValue = stripResponsiveIdentifier(value)
  const computedValue = rawValue === 'reverse' ? `${direction}-reverse` : direction

  return hasResponsiveIdentifier(value)
    ? breakpoint(responsiveIdentifier(value), breakpoints)`
        flex-direction: ${computedValue} !important;
      `
    : `flex-direction: ${computedValue};`
}

/**
 * Computes styles for alignment type properties
 *
 * @param {string} property - eg. 'align-content', 'align-self' etc.
 * @param {string} value - eg. 'left', 'center' etc.
 * @returns {String} - Computed styles
 */
export function computeAlignmentProperty(property, value) {
  let computedValue = ''
  if (value) {
    // Prepend with 'flex-' if a shortcut 'start' or 'end' value was provided
    computedValue = (value.match(/^(start|end)$/) ? 'flex-' : '') + value
  }

  return computedValue ? `${property}: ${computedValue};` : ''
}

/**
 * Computes styles for dimension type properties
 *
 * @param {string} dimension - eg. 'width', 'height' etc.
 * @param {string} value - eg. 'left', 'center' etc.
 * @param {boolean} [fit] - Shortcut flag
 * @returns {String} - Computed styles
 */
export function computeDimension(dimension, value, fit = false) {
  let newValue
  if (fit) {
    newValue = '100%'
  } else if (value) {
    newValue = computeSize(value)
  }

  return newValue ? `${dimension}: ${newValue};` : ''
}

/**
 * Computes styles for the flex-shrink property
 *
 * @param {boolean|number|string} shrink - A shrink prop value eg. true, 0, 1, 'initial'
 * @returns {String} - Computed styles
 */
export function computeShrink(shrink) {
  let value = ''
  if ((isBoolean(shrink) && !shrink) || Number(shrink) === 0) {
    value = 0
  } else if (shrink) {
    value = Number(shrink)
  }

  return isNumber(value) ? `flex-shrink: ${value};` : ''
}

/**
 * Generic helper for generating a spacing related style
 *
 * @param {string} property - The spacing CSS property eg. margin-left, width, padding-right
 * @param {*} value - A spacing value
 * @param {Object} [scales] - A mapping of scale shortcuts to values eg. { smallest: '0.1rem', small: '0.5rem', ... }
 * @returns {String} - Computed styles
 */
export function computeSpacing(property, value, scales) {
  let newValue = ''

  const dashPos = property.indexOf('-')
  const hasDash = dashPos >= 0
  const spacingPropertyType = hasDash ? property.substr(0, dashPos) : property

  if (spacingPropertyType) {
    // Check if in scales
    const scale = get(scales, spacingPropertyType) || scales

    if (scale) {
      // Default to 'regular' if 'true' is provided, otherwise use the given value
      const isBooleanTrue = isBoolean(value) && value
      newValue = get(scale, isBooleanTrue ? 'regular' : value)
    } else {
      // Just use the value provided if a scale shortcut isn't found
      newValue = value
    }
  }

  return newValue ? `${property}: ${newValue};` : ''
}

/**
 * Computes flex-basis styles
 *
 * @param {*} [basis] - A valid size
 * @param {Object} breakpoints - A breakpoint mapping object eg. { xs: 0, sm: 576 }
 * @param {number} [gridSize]
 * @param {...*} props - Any other props
 * @returns {String} - Computed styles
 */
export function computeFlexBasis({ basis, breakpoints, gridSize, ...props } = {}) {
  const styles = []

  // Standard basis property
  if (basis) {
    styles.push(`flex-basis: ${computeSize(basis, gridSize)};`)
  }

  // Add any breakpoint definitions
  BREAKPOINT_PROPS.forEach(breakpointKey => {
    const value = props[breakpointKey]
    if (value) {
      let computedValue = computeSize(value, gridSize)

      styles.push(
        breakpoint(breakpointKey, breakpoints)`
          flex-basis: ${computedValue} !important;
        `
      )
    }
  })

  if (styles.length === 0) return ''

  // Set box-sizing if we have styles
  styles.push('box-sizing: border-box;')

  return styles.join('\n')
}

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

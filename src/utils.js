import dedent from 'dedent-js'
import { forEach, get, isBoolean, isNumber, isString } from 'lodash'

const RESPONSIVE_IDENTIFIER = /^(xs|sm|md|lg|xl)-?/
const BREAKPOINT_KEYS = ['xs', 'xsOnly', 'sm', 'smOnly', 'md', 'mdOnly', 'lg', 'lgOnly', 'xl', 'xlOnly']
const SHORTCUTS = {
  'fit': '100%',
  'full': '100%',
}

/**
 * Parses and converts any shortcuts for a given sizing type property (width, height, flex-basis etc.)
 *
 * @param {*} size - A given size property. Can be a number (fraction or grid size value) or valid CSS size value
 * @param {number} [divideNumbersBy] - Optional. If given a number, will divide it by this amount before
 * converting to a percentage
 * @return {*} - The parsed size
 */
export function computeSize(size, divideNumbersBy = 1) {
  // Check for a shortcut
  const shortcut = SHORTCUTS[String(size).toLowerCase()]
  if (shortcut) return shortcut

  if (isNumber(size)) {
    // Convert number to a percentage if required
    if (divideNumbersBy) return `${(size / divideNumbersBy) * 100}%`

    // Assume pixels otherwise
    return `${size}px`
  }

  // If got to here, just return given value
  return size
}

/**
 * Generates a CSS media query with the given breakpoint
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
  /**
   * Closure template function that generates the actual CSS output
   *
   * @return {String} - The media query wrapped CSS
   */
  return (strings, ...values) => {
    const content = strings.reduce((accumulator, current, index) => {
      accumulator += current

      if (values.hasOwnProperty(index)) {
        accumulator += String(values[index])
      }

      return accumulator
    }, '')


    const breakpointOnly = !!breakpoint.match(/Only$/)
    const breakpointValue = breakpoints[breakpoint.replace('Only', '')]

    const minWidth = `(min-width: ${breakpointValue}px)`

    let maxWidth = ''
    if (breakpointOnly) {
      const breakpointValues = Object.values(breakpoints)
      const currentBreakpointPosition = breakpointValues.indexOf(breakpointValue)
      const nextBreakpointPosition = currentBreakpointPosition > -1 &&
        breakpointValues[currentBreakpointPosition + 1] && currentBreakpointPosition + 1

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
 * Determines if the given string has a responsive identifier or not
 *
 * @param {String} string - The string to check eg. sm-row, lg-space-around
 * @returns {boolean} - True if the given prop is responsive or not
 */
export function hasResponsiveIdentifier(string) {
  return !!String(string).match(RESPONSIVE_IDENTIFIER);
}

/**
 * Removes any responsive prefixes from the given string
 *
 * @param {string} string - The string to remove any responsive identifiers from eg. sm-row
 * @return {string} - The string with removed responsive identifiers
 */
export function stripResponsiveIdentifier(string) {
  return string.replace(RESPONSIVE_IDENTIFIER, '')
}

/**
 * Gets the responsive identifier from the string if it has one
 *
 * @param {string} string - The string to get the identifier from eg. sm-row, lg-space-around
 * @returns {string} - The responsive identifier, or an empty string if none exists
 */
export function getResponsiveIdentifier(string) {
  const matches = string.match(RESPONSIVE_IDENTIFIER)
  return matches ? matches[0] : ''
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

export function computeFlexDirection(column, row, breakpoints) {
  if (!column && !row) return ''

  const computedStyles = []
  forEach({ column, row }, (value, direction) => {
    if (!value) return;

    if (isBoolean(value)) {
      computedStyles.push(`flex-direction: ${direction};`)
    }

    else if (isString(value)) {
      value.split(' ').forEach(subValue => {
        const rawSubValue = stripResponsiveIdentifier(subValue)
        const calculatedSubValue = rawSubValue === 'reverse'
          ? `${direction}-reverse`
          : direction

        computedStyles.push(hasResponsiveIdentifier(subValue)
          ? breakpoint(getResponsiveIdentifier(subValue), breakpoints)`
              flex-direction: ${calculatedSubValue} !important;
            `
          : `flex-direction: ${calculatedSubValue};`
        )
      })
    }
  })

  return computedStyles.join('\n')
}

export function computeAlignmentProperty(property, value) {
  let computedValue = ''
  if (value) {
    // Prepend with 'flex-' if a shortcut 'start' or 'end' value was provided
    computedValue = (value.match(/^(start|end)$/) ? 'flex-' : '') + value
  }

  return computedValue ? `${property}: ${computedValue};` : ''
}

export function computeDimension(dimension, value, fit = false) {
  let newValue
  if (fit) {
    newValue = '100%'
  } else if (value) {
    newValue = computeSize(value)
  }

  return newValue ? `${dimension}: ${newValue};` : ''
}

export function computeShrink(shrink) {
  let value = ''
  if (
    (isBoolean(shrink) && !shrink) ||
    (Number(shrink) === 0)
  ) {
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
 * @returns {string}
 */
export function computeSpacing(property, value, scales) {
  let newValue = ''

  const dashPos = property.indexOf('-')
  const hasDash = dashPos >= 0
  const spacingPropertyType = hasDash ? property.substr(0, dashPos) : property

  if (spacingPropertyType) {
    // Check if in scales
    const scale = get(scales, spacingPropertyType) || scales;

    if (scale) {
      // Default to 'regular' if 'true' is provided, otherwise use the given value
      const isBooleanTrue = isBoolean(value) && value
      newValue = get(scale, isBooleanTrue ? 'regular' : value)
    }

    // Just use the value provided if a scale shortcut isn't found
    else {
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
  const styles = [];

  // Standard basis property
  if (basis) {
    styles.push(`flex-basis: ${computeSize(basis, gridSize)};`)
  }

  // Add any breakpoint definitions
  BREAKPOINT_KEYS.forEach(breakpointKey => {
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

import { BREAKPOINT_PROPS, SHORTCUTS } from '../constants'
import {
  breakpoint,
  forEach,
  get,
  hasResponsiveIdentifier,
  isBoolean,
  isNaN,
  isNumber,
  isString,
  responsiveIdentifier,
  stripResponsiveIdentifier,
} from '../utils'

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
function size(size, divideNumbersBy = 1) {
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
 * Computes a flex-wrap style
 *
 * @param {boolean|string} wrap - eg. wrap, wrap-reverse
 * @returns {string} - Computed styles
 */
export function flexWrap(wrap) {
  let value = wrap
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
export function flexDirection({ column, row, breakpoints } = {}) {
  if (!column && !row) return ''

  const computedStyles = []
  forEach({ column, row }, (value, direction) => {
    if (!value) return

    if (isBoolean(value)) {
      computedStyles.push(`flex-direction: ${direction};`)
    } else if (isString(value)) {
      value.split(' ').forEach(subValue => {
        computedStyles.push(flexDirectionStringValue(subValue, direction, breakpoints))
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
function flexDirectionStringValue(value, direction, breakpoints) {
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
export function alignmentProperty(property, value) {
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
export function dimension(dimension, { value, fit = false }) {
  let newValue
  if (fit) {
    newValue = '100%'
  } else if (value) {
    newValue = size(value)
  }

  return newValue ? `${dimension}: ${newValue};` : ''
}

/**
 * Computes styles for the flex-shrink property
 *
 * @param {boolean|number|string} shrink - A shrink prop value eg. true, 0, 1, 'initial'
 * @returns {String} - Computed styles
 */
export function shrink(shrink) {
  let value = ''
  if ((isBoolean(shrink) && !shrink) || Number(shrink) === 0) {
    value = 0
  } else if (shrink) {
    const convertedToNumber = Number(shrink)
    value = isNaN(convertedToNumber) ? '' : convertedToNumber
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
export function spacing(property, value, scales) {
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
export function flexBasis({ basis, breakpoints, gridSize, ...props } = {}) {
  const styles = []

  // Standard basis property
  if (basis) {
    styles.push(`flex-basis: ${size(basis, gridSize)};`)
  }

  // Add any breakpoint definitions
  BREAKPOINT_PROPS.forEach(breakpointKey => {
    const value = props[breakpointKey]
    if (value) {
      let computedValue = size(value, gridSize)

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

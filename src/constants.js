/**
 * The keyword used when dealing with a single responsive range
 * @type {string}
 */
export const BREAKPOINT_ONLY_IDENTIFIER = 'Only'

/**
 * Pattern for matching a responsive prop in a string
 * @type {RegExp}
 */
export const RESPONSIVE_IDENTIFIER_PATTERN = new RegExp(
  `^(xs|sm|md|lg|xl)(${BREAKPOINT_ONLY_IDENTIFIER})?-?`
)

/**
 * Supported breakpoints and their default values (values can be customised)
 * @type {Object}
 */
export const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
}

/**
 * Default scale for use by spacing helpers eg. marginTop="small"
 * @type {Object}
 */
export const SPACING_SCALE = {
  smallest: '0.1rem',
  smaller: '0.3rem',
  small: '0.6rem',
  regular: '1rem',
  large: '1.3rem',
  larger: '1.6',
  largest: '2rem',
}

/**
 * An array of all possible breakpoint props eg. xs, xsOnly, sm, smOnly etc.
 * @type {Array}
 */
export const BREAKPOINT_PROPS = [
  'xs',
  'xsOnly',
  'sm',
  'smOnly',
  'md',
  'mdOnly',
  'lg',
  'lgOnly',
  'xl',
]

/**
 * Instead of providing a fraction for the responsive props, you can provide a whole number which will
 * be
 * @type {number}
 */
export const DEFAULT_GRID_SIZE = 12

/**
 * Available shortcut prop aliases
 * @type {Object}
 */
export const SHORTCUTS = {
  fit: '100%',
}

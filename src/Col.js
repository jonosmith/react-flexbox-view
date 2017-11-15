/**
 * Helper View component with defaults for creating columns
 */

import { node } from 'prop-types'
import React from 'react'

import View from './index'

const Row = ({ children, ...props }) => (
  <View column {...props}>{children}</View>
)

Row.propTypes = {
  children: node,
}

export default Row

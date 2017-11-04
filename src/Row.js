/**
 * Helper View component with defaults for creating rows
 */

import { node } from 'prop-types'
import React from 'react'

import View from './index'

const Row = ({ children, ...props }) => (
  <View wrap row {...props}>{children}</View>
)

Row.propTypes = {
  children: node,
}

export default Row

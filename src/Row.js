/**
 * Helper View component for creating classic responsive grids (default of 12 columns)
 */

import React from 'react'
import { node, number } from 'prop-types'
import View from './index'
import ViewProvider from './ViewProvider'

const Row = ({ children, columns = 12, ...props }) => (
  <ViewProvider gridSize={columns}>
    <View wrap {...props}>{children}</View>
  </ViewProvider>
)

Row.propTypes = {
  children: node,
  columns: number,
}

export default Row

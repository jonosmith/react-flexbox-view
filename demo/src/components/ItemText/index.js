import React from 'react'
import { node } from 'prop-types'
import View from '../../../../src'

const ItemText = ({ children, ...props }) => (
  <View alignItems="center">{children}</View>
)

ItemText.propTypes = {
  children: node,
}

export default ItemText

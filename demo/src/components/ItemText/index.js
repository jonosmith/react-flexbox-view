import { node } from 'prop-types'
import React from 'react'
import View from '../../../../src'

const ItemText = ({ children, ...props }) => <View alignItems="center">{children}</View>

ItemText.propTypes = {
  children: node,
}

export default ItemText

import React from 'react'
import View from '../../../src/index'
import Alignment from './Positioning/index'
import ResponsiveLayout from './ResponsiveLayout/index'
import SpacingHelpers from './SpacingHelpers/index'

const Examples = () => (
  <View column padding>
    <ResponsiveLayout />
    <Alignment />
    <SpacingHelpers />
  </View>
)

export default Examples

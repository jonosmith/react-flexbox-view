import React from 'react'
import dedent from 'dedent-js'
import View from '../../../../../src/index'
import CodeBlock from '../../../components/CodeBlock/index'
import Item from '../../../components/Item/index'
import ItemContainer from '../../../components/ItemContainer/index'

const AlignItems = () => (
  <View column>
    <h3>Align Items</h3>
    <ItemContainer height="10rem" alignItems="start" marginBottom>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </ItemContainer>
    <ItemContainer height="10rem" alignItems="center" marginBottom>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </ItemContainer>
    <ItemContainer height="10rem" alignItems="end" marginBottom>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </ItemContainer>
    <CodeBlock>{dedent(`
      <View alignItems="start">
        <View />
        <View />
        <View />
      </View>
      <View alignItems="center">
        <View />
        <View />
        <View />
      </View>
      <View justifyContent="end">
        <View />
        <View />
        <View />
      </View>
    `)}</CodeBlock>
  </View>
)

export default AlignItems

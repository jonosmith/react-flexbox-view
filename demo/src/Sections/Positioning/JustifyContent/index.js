import React from 'react'
import dedent from 'dedent-js'
import View from '../../../../../src/index'
import CodeBlock from '../../../components/CodeBlock/index'
import Item from '../../../components/Item/index'
import ItemContainer from '../../../components/ItemContainer/index'

const Cell = () => (
  <Item basis="4rem" grow={false} />
)

const JustifyContent = () => (
  <View column>
    <h3>Justify Content</h3>
    <ItemContainer justifyContent="start" marginBottom>
      <Cell />
      <Cell />
      <Cell />
    </ItemContainer>
    <ItemContainer justifyContent="center" marginBottom>
      <Cell />
      <Cell />
      <Cell />
    </ItemContainer>
    <ItemContainer justifyContent="end" marginBottom>
      <Cell />
      <Cell />
      <Cell />
    </ItemContainer>
    <CodeBlock>{dedent(`
      const Cell = () => (
        <View basis="4rem" grow={false} />
      )

      ...

      <View justifyContent="end">
        <Cell />
        <Cell />
        <Cell />
      </View>
      <View justifyContent="end">
        <Cell />
        <Cell />
        <Cell />
      </View>
      <View justifyContent="end">
        <Cell />
        <Cell />
        <Cell />
      </View>
    `)}</CodeBlock>
  </View>
)

export default JustifyContent

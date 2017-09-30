import dedent from 'dedent-js'
import React from 'react'
import View from '../../../../../src/index'
import CodeBlock from '../../../components/CodeBlock/index'
import Item from '../../../components/Item/index'
import ItemContainer from '../../../components/ItemContainer/index'

const AlignSelf = () => (
  <View column>
    <h3>Align Self</h3>
    <ItemContainer height="12rem">
      <Item align="start" />
      <Item align="center" />
      <Item align="end" />
    </ItemContainer>
    <CodeBlock>
      {dedent(`
        <View>
          <View align="start" />
          <View align="center" />
          <View align="end" />
        </View>
      `)}
    </CodeBlock>
  </View>
)

export default AlignSelf

import dedent from 'dedent-js'
import React from 'react'
import CodeBlock from '../../components/CodeBlock/index'
import Item from '../../components/Item/index'
import ItemContainer from '../../components/ItemContainer/index'
import Section from '../../components/Section/index'

const SpacingHelpers = () => (
  <Section column>
    <h2>Spacing Helpers</h2>
    <ItemContainer column>
      <Item center padding marginLeft marginRight="smaller" marginBottom="large" />
    </ItemContainer>
    <CodeBlock>
      {dedent(`
        <View marginLeft marginTop="small" marginRight="smaller" marginBottom="large" />
      `)}
    </CodeBlock>
  </Section>
)

export default SpacingHelpers

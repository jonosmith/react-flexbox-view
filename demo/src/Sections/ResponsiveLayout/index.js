/* global __NAME__ */

import dedent from 'dedent-js'
import React from 'react'
import View from '../../../../src/index'
import CodeBlock from '../../components/CodeBlock/index'
import Item from '../../components/Item/index'
import ItemContainer from '../../components/ItemContainer/index'
import ItemText from '../../components/ItemText/index'
import Section from '../../components/Section/index'

const ResponsiveLayout = () => (
  <Section>
    <h2>Responsive Layout</h2>
    <ItemContainer column>
      <View wrap>
        <Item xs={1}>full</Item>
        <Item xs={1} sm={1 / 2}>
          <ItemText>full (xs+)</ItemText>
          <ItemText>half (sm+)</ItemText>
        </Item>
        <Item xs={1} sm={1 / 2}>
          <ItemText>full (xs+)</ItemText>
          <ItemText>half (sm+)</ItemText>
        </Item>
        <Item xsOnly={1}>
          <ItemText>full (xs)</ItemText>
          <ItemText>auto</ItemText>
        </Item>
        <Item xsOnly={1}>
          <ItemText>full (xs)</ItemText>
          <ItemText>auto</ItemText>
        </Item>
        <Item xsOnly={1}>
          <ItemText>full (xs)</ItemText>
          <ItemText>auto</ItemText>
        </Item>
        <Item>auto</Item>
        <Item>auto</Item>
        <Item>auto</Item>
      </View>
    </ItemContainer>
    <View>
      <CodeBlock>
        {dedent(`
          import View from '${__NAME__}'

          ...

          <View wrap>
            <View xs={1} />
            <View xs={1} sm={1/2} />
            <View xs={1} sm={1/2} />
            <View xsOnly={1} />
            <View xsOnly={1} />
            <View xsOnly={1} />
            <View />
            <View />
            <View />
          </View>
        `)}
      </CodeBlock>
    </View>
  </Section>
)

export default ResponsiveLayout

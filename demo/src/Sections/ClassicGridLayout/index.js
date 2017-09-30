import dedent from 'dedent-js'
import React from 'react'
import View, { ViewProvider } from '../../../../src/index'
import CodeBlock from '../../components/CodeBlock/index'
import Item from '../../components/Item/index'
import ItemContainer from '../../components/ItemContainer/index'
import ItemText from '../../components/ItemText/index'
import Section from '../../components/Section/index'

const ClassicGridLayout = () => (
  <Section>
    <h2>Classic Grid Sizing</h2>
    <ItemContainer column>
      <ViewProvider gridSize={12}>
        <View wrap>
          <Item xs={12} sm={6}>
            <ItemText>12 (xs+)</ItemText>
            <ItemText>6 (sm+)</ItemText>
          </Item>
          <Item xs={12} sm={6}>
            <ItemText>12 (xs+)</ItemText>
            <ItemText>6 (sm+)</ItemText>
          </Item>
        </View>
      </ViewProvider>
    </ItemContainer>
    <View>
      <CodeBlock>
        {dedent(`
        import { Col, Row } from '${__NAME__}'

        ...

        <Row>
          <Col xs={12} sm={6} />
          <Col xs={12} sm={6} />
        </Row>
        `)}
      </CodeBlock>
    </View>
  </Section>
)

export default ClassicGridLayout

import React from 'react'
import Section from '../../components/Section/index'
import AlignItems from './AlignItems/index'
import AlignSelf from './AlignSelf/index'
import JustifyContent from './JustifyContent/index'

const Alignment = () => (
  <Section column>
    <h2>Positioning</h2>
    <JustifyContent />
    <AlignItems />
    <AlignSelf />
  </Section>
)

export default Alignment

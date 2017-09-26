import React from 'react'
import { node } from 'prop-types'
import styled from 'styled-components'
import View from '../../../../src'

const StyledSection = styled(View)`
  margin-bottom: 5rem;
`

const Section = ({ children, ...props }) => (
  <StyledSection column {...props}>{children}</StyledSection>
)

Section.propTypes = {
  children: node,
}

export default Section

import color from 'open-color'
import React from 'react'
import styled from 'styled-components'
import View from '../../../../src'

const Wrapper = styled(View)`
  color: ${color.gray[0]};
  background-color: ${color.gray[9]};
  height: 20rem;
`

export default function Hero({ children, ...props }) {
  return (
    <Wrapper column center marginBottom="largest" {...props}>
      {children}
    </Wrapper>
  )
}

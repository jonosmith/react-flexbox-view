import { string } from 'prop-types'
import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNight } from 'react-syntax-highlighter/dist/styles'
import styled from 'styled-components'

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)`
  padding: 1.5rem !important;
  display: flex;
  flex-grow: 1;
`

export default function CodeBlock({ children }) {
  return (
    <StyledSyntaxHighlighter language="javascript" style={tomorrowNight}>
      {children}
    </StyledSyntaxHighlighter>
  )
}

CodeBlock.propTypes = {
  children: string,
}

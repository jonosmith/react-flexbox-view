/**
 * Main view component
 */

import { bool, node, number, object, oneOf, oneOfType, shape, string } from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import * as styles from './styles'
import { CHANNEL } from './ViewProvider'
import { SPACING_SCALE, BREAKPOINTS } from './constants'

// prettier-ignore
const Div = styled.div`
  ${({ alignContent }) => styles.alignmentProperty('align-content', alignContent)}
  ${({ alignItems, center }) => (styles.alignmentProperty('align-items', center ? 'center' : alignItems))}
  ${({ alignSelf, align }) => styles.alignmentProperty('align-self', align || alignSelf)}
  ${({ basis, ...otherProps }) => styles.flexBasis({ basis, ...otherProps })}
  ${({ column, row, breakpoints }) => styles.flexDirection({ column, row, breakpoints })}
  ${({ inline }) => `display: ${inline ? 'inline-flex' : 'flex'};`}
  ${({ grow }) => (grow ? `flex-grow: ${Number(grow)};` : '')}
  ${({ h, fit }) => styles.dimension('height', { value: h, fit })}
  ${({ justifyContent, center }) => (styles.alignmentProperty('justify-content', center ? 'center' : justifyContent))}
  ${({ margin, scales }) => styles.spacing('margin', margin, scales)}
  ${({ marginBottom, scales }) => styles.spacing('margin-bottom', marginBottom, scales)}
  ${({ marginLeft, scales }) => styles.spacing('margin-left', marginLeft, scales)}
  ${({ marginRight, scales }) => styles.spacing('margin-right', marginRight, scales)}
  ${({ marginTop, scales }) => styles.spacing('margin-top', marginTop, scales)}
  ${({ minHeight }) => minHeight ? `min-height: ${minHeight};` : ''}
  ${({ minWidth }) => minWidth ? `min-width: ${minWidth};` : ''}
  ${({ padding, scales }) => styles.spacing('padding', padding, scales)}
  ${({ paddingBottom, scales }) => styles.spacing('padding-bottom', paddingBottom, scales)}
  ${({ paddingLeft, scales }) => styles.spacing('padding-left', paddingLeft, scales)}
  ${({ paddingRight, scales }) => styles.spacing('padding-right', paddingRight, scales)}
  ${({ paddingTop, scales }) => styles.spacing('padding-top', paddingTop, scales)}
  ${({ position }) => (position ? `position: ${position};` : '')}
  ${({ shrink }) => styles.shrink(shrink)}
  ${({ w, fit }) => styles.dimension('width', { value: w, fit })}
  ${({ flexWrap, nowrap }) => styles.flexWrap(nowrap ? 'nowrap' : flexWrap)}
`

export default class View extends Component {
  static propTypes = {
    align: oneOf([
      'center',
      'end',
      'flex-end',
      'flex-start',
      'space-around',
      'space-between',
      'start',
      'stretch',
    ]),
    alignContent: oneOf([
      'center',
      'end',
      'flex-end',
      'flex-start',
      'space-around',
      'space-between',
      'start',
      'stretch',
    ]),
    alignItems: oneOf(['baseline', 'center', 'end', 'flex-end', 'flex-start', 'start', 'stretch']),
    alignSelf: oneOf(['baseline', 'center', 'end', 'flex-end', 'flex-start', 'start', 'stretch']),
    basis: oneOfType([number, string]),
    breakpoints: shape({
      xs: oneOfType([number, string]).required,
      sm: oneOfType([number, string]).required,
      md: oneOfType([number, string]).required,
      lg: oneOfType([number, string]).required,
      xl: oneOfType([number, string]).required,
    }),
    center: bool,
    children: node,
    className: string,
    column: oneOfType([bool, string]),
    fit: bool,
    gridSize: number,
    grow: oneOfType([bool, number]),
    height: oneOfType([number, string]),
    inline: bool,
    justifyContent: oneOf([
      'center',
      'end',
      'flex-end',
      'flex-start',
      'start',
      'space-around',
      'space-between',
    ]),
    lg: number,
    marginLeft: oneOfType([bool, string]),
    marginTop: oneOfType([bool, string]),
    marginRight: oneOfType([bool, string]),
    marginBottom: oneOfType([bool, string]),
    md: number,
    minWidth: string,
    minHeight: oneOfType([bool, string]),
    nowrap: bool,
    paddingLeft: oneOfType([bool, string]),
    paddingTop: oneOfType([bool, string]),
    paddingRight: oneOfType([bool, string]),
    paddingBottom: oneOfType([bool, string]),
    position: string,
    row: oneOfType([bool, string]),
    scales: object,
    shrink: oneOfType([bool, number]),
    sm: number,
    width: string,
    wrap: oneOfType([bool, oneOf(['reverse'])]),
    xl: number,
    xs: number,
  }

  static defaultProps = {
    basis: 0,
    breakpoints: BREAKPOINTS,
    grow: true,
    position: 'relative',
    scales: SPACING_SCALE,
  }

  static contextTypes = {
    [CHANNEL]: object,
  }

  render() {
    const { children, height, width, wrap, ...props } = this.props

    const parsedProps = {
      // Rename some props so they don't get added to the div
      h: height,
      w: width,
      flexWrap: wrap,

      // Other props
      ...props,

      // Any props provided via context
      ...this.context[CHANNEL],
    }

    return <Div {...parsedProps}>{children}</Div>
  }
}

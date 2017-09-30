/**
 * Main view component
 */

import { bool, node, number, object, oneOf, oneOfType, shape, string } from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import {
  computeAlignmentProperty,
  computeDimension,
  computeFlexBasis,
  computeFlexDirection,
  computeFlexWrap,
  computeShrink,
  computeSpacing,
} from './utils'
import { CHANNEL } from './ViewProvider'

const Div = styled.div`
  ${({ alignContent }) => computeAlignmentProperty('align-content', alignContent)}
  ${({ alignItems, center }) => (computeAlignmentProperty('align-items', center ? 'center' : alignItems))}
  ${({ alignSelf, align }) => computeAlignmentProperty('align-self', align || alignSelf)}
  ${({ basis, ...otherProps }) => computeFlexBasis({ basis, ...otherProps })}
  ${({ column, row, breakpoints }) => computeFlexDirection({ column, row, breakpoints })}
  ${({ inline }) => `display: ${inline ? 'inline-flex' : 'flex'};`}
  ${({ grow }) => (grow ? `flex-grow: ${Number(grow)};` : '')}
  ${({ h, fit }) => computeDimension('height', h, fit)}
  ${({ justifyContent, center }) => (computeAlignmentProperty('justify-content', center ? 'center' : justifyContent))}
  ${({ margin, scales }) => computeSpacing('margin', margin, scales)}
  ${({ marginBottom, scales }) => computeSpacing('margin-bottom', marginBottom, scales)}
  ${({ marginLeft, scales }) => computeSpacing('margin-left', marginLeft, scales)}
  ${({ marginRight, scales }) => computeSpacing('margin-right', marginRight, scales)}
  ${({ marginTop, scales }) => computeSpacing('margin-top', marginTop, scales)}
  ${({ minHeight }) => minHeight ? `min-height: ${minHeight};` : ''}
  ${({ minWidth }) => minWidth ? `min-width: ${minWidth};` : ''}
  ${({ padding, scales }) => computeSpacing('padding', padding, scales)}
  ${({ paddingBottom, scales }) => computeSpacing('padding-bottom', paddingBottom, scales)}
  ${({ paddingLeft, scales }) => computeSpacing('padding-left', paddingLeft, scales)}
  ${({ paddingRight, scales }) => computeSpacing('padding-right', paddingRight, scales)}
  ${({ paddingTop, scales }) => computeSpacing('padding-top', paddingTop, scales)}
  ${({ position }) => (position ? `position: ${position};` : '')}
  ${({ shrink }) => computeShrink(shrink)}
  ${({ w, fit }) => computeDimension('width', w, fit)}
  ${({ flexWrap, nowrap }) => computeFlexWrap(nowrap ? 'nowrap' : flexWrap)}
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
    breakpoints: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
    grow: true,
    position: 'relative',
    scales: {
      smallest: '0.1rem',
      smaller: '0.3rem',
      small: '0.6rem',
      regular: '1rem',
      large: '1.3rem',
      larger: '1.6',
      largest: '2rem',
    },
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

    return (
      <Div {...parsedProps}>{children}</Div>
    )
  }
}

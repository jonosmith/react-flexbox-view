import React, { Children, Component } from 'react'
import { omit } from 'lodash'
import { object } from 'prop-types'

export const CHANNEL = '__react-flexbox-view__'

export default class ViewProvider extends Component {
  static contextTypes = {
    [CHANNEL]: object,
  }

  static childContextTypes = {
    [CHANNEL]: object,
  }

  getChildContext() {
    return { [CHANNEL]: omit({ ...this.context[CHANNEL], ...this.props }, 'children') }
  }

  render() {
    return Children.only(this.props.children)
  }
}
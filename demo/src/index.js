/* global __VERSION__ */

import color from 'open-color'
import React from 'react'
import { render } from 'react-dom'
import { injectGlobal } from 'styled-components'
import View from '../../src'
import ViewProvider from '../../src/ViewProvider.js'
import ActorRegular from './assets/fonts/Actor-Regular.ttf'
import Hero from './components/Hero'
import Examples from './Sections'

// Global styles
injectGlobal`
  @font-face {
    font-family: 'Actor-Regular';
    src: url('${ActorRegular}') format('truetype');
  }
  
  body {
    font-family: 'Actor-Regular';
    color: ${color.gray[8]};
    background-color: ${color.gray[0]};
    margin: 0;
  }
`

/**
 * Demo page that demonstrates usage of the react-flexbox-view component
 */
const Demo = () => (
  <ViewProvider
    scales={{
      smallest: '0.5rem',
      smaller: '0.7rem',
      small: '1rem',
      regular: '1.5rem',
      large: '1.7rem',
      larger: '1.9rem',
      largest: '2.2rem',
    }}
  >
    <View column>
      <Hero>
        <View grow={false}>
          <h1>React-Flexbox-View</h1>
        </View>
        <View grow={false}>
          <p>v{__VERSION__}</p>
        </View>
      </Hero>

      <Examples />
    </View>
  </ViewProvider>
)

render(<Demo />, document.querySelector('#demo'))

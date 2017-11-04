/* global describe it */

import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import expect from 'expect'
import React from 'react'

import { alignmentProperty } from '../index'
import View from '../View'

Enzyme.configure({ adapter: new Adapter() })

describe('View', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(<View />)
    expect(!!wrapper.html().match(/^<div class=".+"><\/div>$/)).toBe(true)
  })

  describe('Different tags', () => {
    function testTag(tagName) {
      it(`Creates a component using the ${tagName} tag`, () => {
        const wrapper = shallow(<View tag={tagName} />)
        expect(wrapper.html().substr(0, tagName.length + 1)).toEqual('<' + tagName)
      })
    }

    testTag('span')
    testTag('header')
    testTag('nav')
  })
})

# React Flexbox View

[![Travis][build-badge]][build]
[![NPM][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

A generic [**Flexbox**](https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties) based layout component for wrapping other components.

The API provides some abstractions over flexbox with readability and useability in mind, with the full power of flexbox still available if you need. A number of shortcut props have been provided that address common use cases when constructing user interfaces

**WARNING**: API is not 100% finalised yet and is subject to change

# Install

```
npm install --save react-flexbox-view
```

# Basic Usage

React Flexbox Grid exports a default base view component which can be used like so:

```javascript
import React from 'react'
import View from 'react-flexbox-view'

const Example = () => (
  <View column fit>
    <View>Row 1</View>
    <View>Row 2</View>
    <View>Row 3</View>
  </View>
)
```

This will create 3 rows one below the other (as parent is `column`), with each row taking up full width of the container which has been set with 100% width and height via the `fit` prop.


## Responsive Helpers
Responsive props can be set that can control what `basis` value is used at different breakpoints:

Responsive props accept the same values as the `basis` prop ie. a valid CSS [length](https://developer.mozilla.org/en-US/docs/Web/CSS/length) OR a fraction wich will be converted into a percentage.

#### Example
In the following example, Cell A will take up 100% of the width of the container at all screen sizes. Cells B and C will do the same on `xs` devices but on `sm` devices they will share the same row, each taking up half the width of the row. Cells D, E and F will each sit on their own row taking up 100% width on `xs` devices only, and in other scenarios will share the same row taking up a third of the width each.

```
<View wrap>
  <View xs={1}>Cell A</View
  <View xs={1} sm={1/2}>Cell B</View>
  <View xs={1} sm={1/2}>Cell C</View>
  <View xsOnly={1}>Cell D</View>
  <View xsOnly={1}>Cell E</View>
  <View xsOnly={1}>Cell F</View>
</View>
```

## Spacing Helpers
A number of spacing helpers have been provided that can be used to easily set margins or padding.

#### Example

The following will set padding and margins of various sizes - which sizes depend on the provided mapping object in the `scales` prop. A boolean value will use the "regular" size in the scale

```
<View padding>
  <View margin marginTop="large" marginBottom="large" />
</View>
```

If you don't like the provided scales, provide your own using the included ViewProvider component


## ViewProvider
The included ViewProvider component provides a way to customize the default props for all View components nested under it. This is handy if you would like to customize some of the defaults, particularly the responsive `breakpoints` or spacing `scales`.

#### Example

```
import View, { ViewProvider } from 'react-flexbox-view'

const Example = () => (
  <ViewProvider
    breakpoints={{
      xs:0,
      sm:576,
      md:768,
      lg:992,
      xl:1200,
    }}
  >
    ...
  </ViewProvider>
)

```


# API

## Core

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| column | `boolean`, `string` | | Sets the [flex-direction](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction) to `column` when `True` or `column-reverse` when `"reverse"` <br><br> **TIP** You can use responsive helpers here eg. `smOnly`, `smOnly md-reverse lgOnly` |
| row | `boolean`, `string` | | Explicitly sets the [flex-direction](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction) to `row` when `True` or `row-reverse` when `"reverse"` <br><br> **TIP** You can use responsive helpers here eg. `smOnly`, `smOnly md-reverse lgOnly` |
| wrap | `boolean`, `string` | | Sets the [flex-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap) property ie. whether child flex items are forced onto a single line or can be wrapped onto multiple lines.<br><br>**TIP**: Specifying `'reverse'` is a shortcut for `'wrap-reverse'` |
| grow | `boolean`, `number` | `true` | The flex grow factor ([flex-grow](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow)) ie. what amount of space inside the flex container the item should take up <br><br> **TIP:** `true` will set it to 1 and `false` will set to 0 |
| shrink | `boolean`, `number` | | The flex shrink factor ([flex-shrink](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow)) ie. how much the flex item will shrink relative to the other items in the container <br><br> **TIP:** `true` will set it to 1 and `false` will set to 0 |
| basis | `number`, `string` | | Sets the [flex-basis](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis) property which is the intial main size of a flex item. <br><br> **Tip**: You can use standard CSS [length](https://developer.mozilla.org/en-US/docs/Web/CSS/length) values (`10px`, `1rem`, `100%` etc.) or if a fraction is supplied this will be converted to a percentage eg. `1/4` will be set as `25%` |

## Positioning

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| justifyContent | `string` | | Defines how the browser distributes space between and around child items along the **main axis** of their container. <br><br> Valid options include `center`, `end`, `flex-end`, `flex-start`, `start`, `space-around`, `space-between` <br><br> **TIP**: `start` and `end` are shortcuts for `flex-start` and `flex-end` respectively |
| alignItems | `string` | | Defines how the browser distributes space between and around child items along the **cross axis** of their container. <br><br> Valid options include `center`, `end`, `flex-end`, `flex-start`, `start`, `space-around`, `space-between` <br><br> **TIP**: `start` and `end` are shortcuts for `flex-start` and `flex-end` respectively |
| alignContent | `string` | |  Aligns the container's lines along the **cross axis** in **multi-line** containers. Has no effect in single line boxes<br><br> Valid options include `center`, `end`, `flex-end`, `flex-start`, `start`, `space-around`, `space-between` <br><br> **TIP**: `start` and `end` are shortcuts for `flex-start` and `flex-end` respectively |
| alignSelf | `string` | |  Allows the default alignment along the **cross axis** specified by the container's `alignItems` to be overwritten for the individual component.<br><br> Valid options include `center`, `end`, `flex-end`, `flex-start`, `start`, `space-around`, `space-between` <br><br> **TIP**: `start` and `end` are shortcuts for `flex-start` and `flex-end` respectively |
| center | `boolean` | | Positions children in the center of the component (both axes). Is a shortcut for setting `alignItems="center"` and `justifyContent="center"` |


## Responsive Props

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| breakpoints | `Object` | `{`<br>`xs:0,`<br>`sm:576,`<br>`md:768,`<br>`lg:992,`<br>`xl:1200`<br>`}` | A definition of the various breakpoints. Required when setting the other responsive props |
| xs | `number`, `string` | | A `basis` property that will be applied from the `xs` breakpoint and up |
| xsOnly | `number`, `string` | | A `basis` property that will be applied for `xs` devices only |
| sm | `number`, `string` | | A `basis` property that will be applied from the `sm` breakpoint and up |
| smOnly | `number`, `string` | | A `basis` property that will be applied for `sm` devices only |
| md | `number`, `string` | | A `basis` property that will be applied from the `md` breakpoint and up |
| mdOnly | `number`, `string` | | A `basis` property that will be applied for `md` devices only |
| lg | `number`, `string` | | A `basis` property that will be applied from the `lg` breakpoint and up |
| lgOnly | `number`, `string` | | A `basis` property that will be applied for `lg` devices only |
| xl | `number`, `string` | | A `basis` property that will be applied from the `xl` breakpoint and up |

## Spacing Helpers

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| scales | `object` | `{`<br>`smallest:'0.1rem',`<br>`smaller:'0.3rem',`<br>`small: '0.6rem',`<br>`regular: '1rem',`<br>`large: '1.3rem',`<br>`larger: '1.6rem',`<br>`largest: '2rem'`<br>`}` | An object of key to `length` value mappings. If one of these keys is provided as a margin or padding prop value then the corresponding value to use will be looked up in this object. <br><br> **Tip**: To specify different mappings for `margin` and `padding` props, nest these individual mappings under `margin` and `padding` properties ie. `{ padding: { ... }, margin: { ... } }` |
| margin | `boolean`, `string` | | Sets all margins. Accepts a standard CSS [length](https://developer.mozilla.org/en-US/docs/Web/CSS/length), the corresponding length in the provided `scales` prop, or the `regular` one if boolean `true` is provided |
| marginTop | `boolean`, `string` | | Same as margin but sets the top margin only |
| marginRight | `boolean`, `string` | | Same as margin but sets the right margin only |
| marginBottom | `boolean`, `string` | | Same as margin but sets the bottom margin only |
| marginLeft | `boolean`, `string` | | Same as margin but sets the left margin only |
| padding | `boolean`, `string` | | Sets total padding. Accepts a standard CSS [length](https://developer.mozilla.org/en-US/docs/Web/CSS/length), the corresponding length in the provided `scales` prop, or the `regular` one if boolean `true` is provided |
| paddingTop | `boolean`, `string` | | Same as padding but sets the top padding only |
| paddingRight | `boolean`, `string` | | Same as padding but sets the right padding only |
| paddingBottom | `boolean`, `string` | | Same as padding but sets the bottom padding only |
| paddingLeft | `boolean`, `string` | | Same as padding but sets the left padding only |


## Other

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| fit | `boolean` | | Sets the width and height of the component to 100%. Overrides existing `width` and `height` props if they are set |
| inline | `boolean` | | Sets the [display](https://developer.mozilla.org/en-US/docs/Web/CSS/display) to `inline-flex` instead of the default `flex` |
| height | `number`, `string` | | Sets the [height](https://developer.mozilla.org/en-US/docs/Web/CSS/height) CSS property of the component |
| width | `number`, `string` | | Sets the [width](https://developer.mozilla.org/en-US/docs/Web/CSS/width) CSS property of the component |
| minHeight | `number`, `string` | | Sets the [min-height](https://developer.mozilla.org/en-US/docs/Web/CSS/min-height) CSS property of the component |
| minWidth | `number`, `string` | | Sets the [min-width](https://developer.mozilla.org/en-US/docs/Web/CSS/min-width) CSS property of the component |
| position | `string` | `"relative"` | Sets the [position](https://developer.mozilla.org/en-US/docs/Web/CSS/position) CSS property of the component |


# License
[MIT](https://opensource.org/licenses/MIT)


[build-badge]: https://travis-ci.org/jonosmith/react-flexbox-view.svg?branch=master
[build]: https://travis-ci.org/jonosmith/react-flexbox-view

[npm-badge]: https://badge.fury.io/js/react-flexbox-view.svg
[npm]: https://www.npmjs.org/package/react-flexbox-view

[coveralls-badge]: https://coveralls.io/repos/github/jonosmith/react-flexbox-view/badge.svg?branch=master
[coveralls]: https://coveralls.io/github/jonosmith/react-flexbox-view?branch=master


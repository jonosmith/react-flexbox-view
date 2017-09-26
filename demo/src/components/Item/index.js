import React from 'react'
import color from 'open-color'
import { node  } from 'prop-types'
import styled from 'styled-components'
import View from '../../../../src/'

const ItemContent = styled(View)`
  height: 3rem;
  background-color: ${color.orange[1]};
  width: 0;
`

const Item = ({ children, ...props }) => (
  <View padding="smallest" {...props}>
    <ItemContent
      column
      alignContent="center"
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </ItemContent>
  </View>
)

Item.propTypes = {
  children: node,
}

export default Item

import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import tinycolor from 'tinycolor2'
import base, { attrs } from './base'
import defaultProps from './defaultProps'
import Color from '../utils/Color'
import Size from '../utils/Size'

export const StyledView = styled.View.attrs({
  ...attrs
})`
  ${base}
  background-color: ${props => props.color};
  padding: ${Size.spacing}px ${Size.spacing * 3}px;
  border-radius: ${Size.spacing * 2};
`
StyledView.defaultProps = {
  margin: 0
}

export const StyledText = styled.Text.attrs({
  ...attrs
})`
  color: ${props => Color[tinycolor(props.color).getBrightness() < 200 ? 'white' : 'black']};
`

const Button = ({ onPress, disabled, style, children, title, ...props }) => (
  <TouchableOpacity disabled={disabled} onPress={onPress}>
    <StyledView {...props} style={{ opacity: disabled ? 0.4 : 1 }}>
      <StyledText {...props}>
        {children || title}
      </StyledText>
    </StyledView>
  </TouchableOpacity>
)
Button.defaultProps = defaultProps

export default Button

import styled from 'styled-components/native'
import base from './base'
import defaultProps from './defaultProps'

const MyComponent = styled.MyComponent`
  ${base}
`
MyComponent.defaultProps = defaultProps

export default MyComponent

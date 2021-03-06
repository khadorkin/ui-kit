/* eslint-env jest */
import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import Text from '../index.js'

describe('Text.web', () => {
  it('renders a snapshot', () => {
    const wrapper = shallow(
      <Text>Apple</Text>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders a snapshot with `size:small`', () => {
    const wrapper = shallow(
      <Text size='small'>Apple</Text>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders a snapshot with `color:blue`', () => {
    const wrapper = shallow(
      <Text color='blue'>Apple</Text>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders a snapshot with `margin:\'1 0\'`', () => {
    const wrapper = shallow(
      <Text margin='1 0'>Apple</Text>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders a snapshot with `alignSelf:center`', () => {
    const wrapper = shallow(
      <Text alignSelf='center'>Apple</Text>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('returns something when onPressed', () => {
    const wrapper = shallow(
      <Text onPress={() => 'onPressed'}>Text Button</Text>
    )
    const result = wrapper.props().onClick()
    expect(result).toEqual('onPressed')
  })

  it('renders a snapshot with `content`', () => {
    const wrapper = shallow(
      <Text content>Content</Text>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders a snapshot with `bold`', () => {
    const wrapper = shallow(
      <Text bold>Bold</Text>
    )
    expect(wrapper).toMatchSnapshot()
  })
})

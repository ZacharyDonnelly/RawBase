import React from 'react'
import { storiesOf, addDecorator, ComponentMeta } from '@storybook/react'
// import { withA11y } from '@storybook/addon-a11y'

import HorizontalRule from '.'

// addDecorator(withA11y)

export default {
  title: 'HorizontalRule',
  component: HorizontalRule
} as ComponentMeta<typeof HorizontalRule>

storiesOf('HorizontalRule', module).add('Default', () => <HorizontalRule />)

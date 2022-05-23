import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
// import { withA11y } from '@storybook/addon-a11y'

import Loading from '.'

// addDecorator(withA11y)

storiesOf('Loading', module)
  .add('Default 250ms delay', () => <Loading />)
  .add('No Delay', () => <Loading show={true} />)
  .add('Spinner', () => (
    <div style={{ height: '5rem', width: '5rem' }}>
      <Loading spinner />
    </div>
  ))
  .add('w/ Children', () => <Loading>Chidlren YAY!</Loading>)
  .add('Custom Delay', () => (
    <>
      <h2>Will show below after 2000ms</h2>
      <Loading timeout={2000} />
    </>
  ))

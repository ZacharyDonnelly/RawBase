import { configure, addDecorator } from '@storybook/react'
import { setDefaults } from '@storybook/addon-info'

import { withConsole } from '@storybook/addon-console'

// addon-info
setDefaults({
  inline: true,
  maxPropsIntoLine: 0
})

addDecorator((storyFn, context) => withConsole()(storyFn)(context))

// automatically import all files ending in *.stories.js
const req = require.context('../src/', true, /.stories.tsx?$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module)

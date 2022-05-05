import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { BrowserRouter } from 'react-router-dom'

import AppRouter from './routes'

import { store } from './store/store'
import './index.scss'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </BrowserRouter>
)

import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import AppRouter from './routes'

import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <BrowserRouter>
    <Provider store={store}>
    <AppRouter />
    </Provider>
    </BrowserRouter>>
)

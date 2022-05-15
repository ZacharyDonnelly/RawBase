import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { BrowserRouter } from 'react-router-dom'

import { ApolloProvider } from '@apollo/client'

import { store } from '../store'

import AppRouter from './routes'

import { client } from './utils/lib/ApolloClient'
import './index.scss'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ApolloProvider>
  </BrowserRouter>
)

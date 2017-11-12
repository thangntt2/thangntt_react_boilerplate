import React from 'react'
import { Router, Route } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import App from './containers/App'

export const Root = (props) => {
  const { store, history } = props
  return (
    <Provider store={store}>
      <Router history={history}>
        <MuiThemeProvider>
          <Route path='/' component={App} />
        </MuiThemeProvider>
      </Router>
    </Provider>
  )
}

export default Root

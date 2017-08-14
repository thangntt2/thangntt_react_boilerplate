
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import ReactDOM from 'react-dom'
import React from 'react'
import { getStoredState, createPersistor } from 'redux-persist'
import { AppContainer } from 'react-hot-loader'
import rootSaga from './sagas'

import Root from './root'
import configureStore from './store/configureStore'

const persistConfig = { /**
  whitelist: ['auth']
 */
}

getStoredState(persistConfig, (err, restoredState) => {
  const store = configureStore(restoredState)
  store.runSaga(rootSaga)
  const history = syncHistoryWithStore(browserHistory, store)
  createPersistor(store, persistConfig)

  // const checkAuth = (nextState, replace) => {
  //   const { auth: { access_token, expires_on } } = store.getState()
  //   const loggedIn = access_token && expires_on > new Date().getTime()

  //   if (nextState.location.pathname !== '/login' && nextState.location.pathname !== '/logout') {
  //     if (!loggedIn) {
  //       replace('/login')
  //     }
  //   }
  // }
  injectTapEventPlugin()
  const render = (RootComponent) => {
    ReactDOM.render(
      <AppContainer>
        <RootComponent store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    )
  }

  render(Root)
  if (module.hot) {
    module.hot.accept('./root', () => {
      const NewRoot = require('./root').default

      render(NewRoot)
    })
  }
})

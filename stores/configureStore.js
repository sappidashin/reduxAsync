import thunkMiddleware from 'redux-thunk' 
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { selectSubreddit, fetchPosts } from '../actions/actions'
import rootReducer from '../reducers/reducers'

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, createLogger())
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/reducers', () => {
      const nextRootReducer = require('../reducers/reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
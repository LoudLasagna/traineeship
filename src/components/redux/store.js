/* eslint-disable no-unused-vars */
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import myApp from './reducers'

const persistConfig = {
  key: 'storage54',
  storage
}

const persistedReducer = persistReducer(persistConfig, myApp)

export default () => {
  const store = createStore(persistedReducer, applyMiddleware(thunk))
  const persistor = persistStore(store)
  return { store, persistor }
}

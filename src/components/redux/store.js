/* eslint-disable no-unused-vars */
import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import myApp from './reducers'

const persistConfig = {
  key: 'storage',
  storage
}

const persistedReducer = persistReducer(persistConfig, myApp)

export default () => {
  const store = createStore(persistedReducer)
  const persistor = persistStore(store)
  return { store, persistor }
}

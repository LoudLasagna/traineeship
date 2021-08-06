/* eslint-disable no-unused-vars */
import { createStore } from 'redux'
import myApp from './reducers'

import {
  addProduct,
  removeProduct,
  setProductAmount,
  clearCart,
  login,
  logout
} from './actions'

const store = createStore(myApp)

console.log(store.getState())

store.subscribe(() => console.log(store.getState()))

export default store

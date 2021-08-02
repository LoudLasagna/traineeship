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

// Каждый раз при обновлении состояния - выводим его
// Отметим, что subscribe() возвращает функцию для отмены регистрации слушателя
const unsubscribe = store.subscribe(() => console.log(store.getState()))

store.dispatch(addProduct({ id: 1, amount: 12 }))
store.dispatch(addProduct({ id: 2, amount: 9 }))

unsubscribe()

export default store

import { combineReducers } from 'redux'

function findIndex(array, id) {
  return array.findIndex((arrayEntry) => arrayEntry.id === id)
}

function cartReducer(state = { products: [] }, action) {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [
          ...state.products,
          {
            id: action.product.id,
            amount: action.product.amount
          }
        ]
      }
    case 'REMOVE_PRODUCT':
      return {
        ...state,
        products: [
          state.products.concat()
            .splice(state.products.find((arrayEntry) => arrayEntry.id === action.product.id), 1)
        ]
      }
    case 'SET_PRODUCT_AMOUNT':
      return {
        ...state,
        products: [
          state.products.concat().splice(
            findIndex(state.products, action.product.id), 1, action.payload
          )
        ]
      }
    case 'CLEAR_CART':
      return {
        ...state,
        products: []
      }
    default:
      return state
  }
}

function userReducer(state = {}, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.user }
    case 'LOGOUT':
      return { ...state, user: {} }
    default:
      return state
  }
}

const myApp = combineReducers({
  cartReducer,
  userReducer
})

export default myApp

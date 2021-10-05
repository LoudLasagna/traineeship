import { combineReducers } from 'redux'

const cartDefaultState = {
  cart: []
}

const usersDefaultState = {
  user: {},
  loggedIn: false
}

function cartReducer(state = cartDefaultState, action) {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            object: action.product.object,
            amount: action.product.amount
          }
        ]
      }
    case 'REMOVE_PRODUCT':
      return {
        ...state,
        cart:
          state.cart.filter((arrayEntry) => arrayEntry.object.id !== action.product.id)
      }
    case 'SET_PRODUCT_AMOUNT':
      return {
        ...state,
        cart:
          state.cart.map((arrayEntry) => (
            arrayEntry.object.id === action.product.object.id
              ? {
                object: arrayEntry.object,
                amount: action.product.amount
              }
              : {
                object: arrayEntry.object,
                amount: arrayEntry.amount
              }
          ))
      }
    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      }
    case 'CHECKOUT':
      return {
        ...state,
        cart: []
      }
    default:
      return state
  }
}
function userReducer(state = usersDefaultState, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.user, loggedIn: !state.loggedIn }
    case 'LOGOUT':
      return { ...state, user: {}, loggedIn: !state.loggedIn }
    case 'CHANGEUSER':
      return {
        ...state,
        user: action.newUser
      }
    default:
      return state
  }
}

const myApp = combineReducers({
  cartReducer,
  userReducer
})

export default myApp

import { createStore, combineReducers, applyMiddleware } from 'redux'


function cartReducer(state = { products: [] }, action) {
    switch (action.type) {
      case 'addtocart':
        return Object.assign({}, state, { products: [
            ...state.products,
            {
                id: action.id,
                amount: action.amount
            }
          ] 
         })
      case 'removefromcart':
        return Object.assign({}, state, { products: [
            state.products.concat()
            .splice(products.find((arrayEntry) => arrayEntry.id === action.id), 1)
          ] 
         })
      default:
        return state
    }
  }

  function userReducer(state = { userObj: {} }, action) {
    switch (action.type) {
        case 'login':
            return Object.assign({}, state,{
                userObj: action.userObj
            })
        case 'logout':
            return Object.assign({}, state,{
                userObj: {}
            })
        default:
            return state
    }
  }


const myApp = combineReducers({
    cartReducer,
    userReducer
})

export default myApp
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlicer'
import cartReducer from './cartSlicer'

export default configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer
  }
})

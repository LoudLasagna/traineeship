import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
      products: []
    },
    reducers: {
      addToCart: (state, action) => {
        state.products.push(action.payload)
      },
      removeFromCart: (state, action) => {
        state.products.splice(state.products.find((arrayEntry) => arrayEntry === action.payload), 1)
      },
      removeAllFromCart: (state) => {
        state.products = []
      }
    },
  })
  
  export const { addToCart, removeFromCart, removeAllFromCart } = cartSlice.actions
  
  export default cartSlice.reducer
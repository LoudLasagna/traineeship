/* eslint-disable no-param-reassign */
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
      state.products.splice(
        state.products.findIndex((arrayEntry) => arrayEntry.id === action.payload.id), 1
      )
    },
    setAmount: (state, action) => {
      const foundIndex = state.products.findIndex(
        (arrayEntry) => arrayEntry.id === action.payload.id
      )
      state.products[foundIndex] = action.payload
    },
    removeAllFromCart: (state) => {
      state.products = []
    }
  }
})

export const {
  addToCart, removeFromCart, setAmount, removeAllFromCart
} = cartSlice.actions

export default cartSlice.reducer

/* eslint-disable no-unused-vars */

export const fetchProductsPending = () => ({
  type: 'FETCH_PRODUCTS_PENDING'
})

export const fetchProductsSuccess = (products) => ({
  type: 'FETCH_PRODUCTS_SUCCESS',
  products
})

export const fetchProductsError = (error) => ({
  type: 'FETCH_PRODUCTS_ERROR',
  error
})

export const addProduct = (product) => ({
  type: 'ADD_PRODUCT',
  product
})

export const removeProduct = (product) => ({
  type: 'REMOVE_PRODUCT',
  product
})

export const setProductAmount = (product) => ({
  type: 'SET_PRODUCT_AMOUNT',
  product
})

export const clearCart = () => ({
  type: 'CLEAR_CART'
})

export const checkOut = () => ({
  type: 'CHECKOUT'
})

export const login = (user) => ({
  type: 'LOGIN',
  user
})

export const logout = () => ({
  type: 'LOGOUT'
})

export const changeuser = (newUser) => ({
  type: 'CHANGEUSER',
  newUser
})

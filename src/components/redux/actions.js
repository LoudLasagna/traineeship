/* eslint-disable no-unused-vars */
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

export const checkOut = (userInfo) => ({
  type: 'CHECKOUT',
  userInfo
})

export const login = (user) => ({
  type: 'LOGIN',
  user
})

export const logout = () => ({
  type: 'LOGOUT'
})

export const changeuser = (oldUser, newUser) => ({
  type: 'CHANGEUSER',
  oldUser,
  newUser
})

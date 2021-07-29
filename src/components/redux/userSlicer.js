import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userObj: {}
  },
  reducers: {
    login: (state, action) => {
      state.userObj = action.payload
    },
    logout: (state) => {
      state.userObj = {}
    }
  }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer

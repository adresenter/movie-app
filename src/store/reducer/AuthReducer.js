import { createSlice } from '@reduxjs/toolkit'
const initialTokenId = localStorage.getItem('tokenId')
const initialEmail = localStorage.getItem('email')
const initialLogin = !!initialTokenId
const initialState = {
  userInfo: [],
  email: initialEmail,
  localId: initialTokenId,
  isLoggedIn: initialLogin,
}
const AuthReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, actions) {
      localStorage.setItem('tokenId', actions.payload.localId)
      localStorage.setItem('email', actions.payload.email)
      state.email = actions.payload.email
      state.isLoggedIn = true
      state.localId = actions.payload.localId
    },
    getUserInfo(state, actions) {
      const convertData = []
      for (let key in actions.payload) {
        convertData.push({ id: key, ...actions.payload[key] })
      }
      state.userInfo = convertData
    },
    logout(state) {
      state.isLoggedIn = false
      state.localId = ''
      state.email = ''
      localStorage.removeItem('tokenId')
      localStorage.removeItem('email')
    },
  },
})
const { reducer, actions } = AuthReducer
export const { login, logout, getUserInfo } = actions
export default reducer

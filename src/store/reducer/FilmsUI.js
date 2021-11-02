import { createSlice } from '@reduxjs/toolkit'
const filmId = localStorage.getItem('filmId')
const isComming = localStorage.getItem('isComming')
const initialState = {
  filmIdCurrent: filmId,
  isComming: isComming === 'true' ? true : false,
  time: {},
  isHome: true,
  isSendData: false,
}
const filmsUI = createSlice({
  name: 'filmsUI',
  initialState,
  reducers: {
    replaceId(state, actions) {
      if (!actions.payload) return
      localStorage.setItem('filmId', actions.payload.filmId)
      localStorage.setItem(
        'isComming',
        actions.payload.isComming ? true : false
      )
      state.filmIdCurrent = actions.payload.filmId
      if (actions.payload.isComming) {
        state.isComming = true
      } else {
        state.isComming = false
      }
    },
    addSeat(state, actions) {
      if (!state.time.seat) {
        state.time.seat = [actions.payload]
        return
      }
      const seatId = state.time.seat.findIndex(seat => {
        return seat === actions.payload
      })
      if (seatId === -1) {
        state.time.seat.push(actions.payload)
        return
      }
      state.time.seat.splice(seatId, 1)
      if (state.time.seat.length === 0) {
        delete state.time['seat']
      }
    },
    changeTime(state, actions) {
      const type = actions.payload.type.type
      const value = actions.payload.type.value
      const day = actions.payload.timeActive.day
      const typeActive = actions.payload.timeActive.type
      if (type === 'type') {
        state.time.type = value
        actions.payload.calendar.forEach(item => {
          if (item.day === day) {
            state.time.time = item[value].schedule[0]
          }
        })
      }
      if (type === 'day') {
        actions.payload.calendar.forEach(item => {
          if (item.day === value) {
            state.time.day = value
            state.time.time = item[typeActive].schedule[0]
            // state.time.time = item[value].schedule[0]
          }
        })
      }
      if (type === 'time') {
        actions.payload.calendar.forEach(item => {
          if (item.day === day) {
            state.time.time = value
          }
        })
      }
    },
    userInfoChange(state, actions) {
      state.isSendData = actions.payload
    },
    setTime(state, actions) {
      state.time = actions.payload
    },
    resetTime(state) {
      state.time = {}
    },
  },
})
const { reducer, actions } = filmsUI
export const {
  replaceId,
  setTime,
  resetTime,
  addSeat,
  changeTime,
  userInfoChange,
} = actions
export default reducer

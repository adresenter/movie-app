import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  films: [],
  commingSoon: [],
}
const FilmsStore = createSlice({
  name: 'films',
  initialState,
  reducers: {
    replaceFilm(state, actions) {
      const convertData = []
      for (let film in actions.payload) {
        const calendar = []
        const calendarObj = actions.payload[film].calendar
        for (let day in calendarObj) {
          calendar.push({ day: day, ...calendarObj[day].format })
        }
        convertData.push({
          id: film + actions.payload[film].time,
          name: film,
          ...actions.payload[film],
          calendar: calendar,
        })
      }
      state.films = convertData
    },
    replaceCommingSoon(state, actions) {
      const convertData = []
      for (let film in actions.payload) {
        convertData.push({
          name: film,
          id: film + actions.payload[film].time,
          ...actions.payload[film],
        })
      }
      state.commingSoon = convertData
    },
    updateSeat(state, actions) {
      state.films.forEach(film => {
        if (film.id === actions.payload.id) {
          film.choosed = {}
          film.choosed[actions.payload.timeBooking] = {}
          film.choosed[actions.payload.timeBooking].seat = actions.payload.seat
        }
      })
    },
  },
})
const { reducer, actions } = FilmsStore
export const { replaceFilm, replaceCommingSoon, updateSeat } = actions
export default reducer

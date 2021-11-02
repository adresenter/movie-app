import { configureStore } from '@reduxjs/toolkit'
import FilmsReducer from './reducer/FilmsReducer'
import FilmsUIReducer from './reducer/FilmsUI'
import SeatReducer from './reducer/SeatReducer'
import AuthReducer from './reducer/AuthReducer'
const Store = configureStore({
  reducer: {
    films: FilmsReducer,
    filmsUI: FilmsUIReducer,
    seat: SeatReducer,
    auth: AuthReducer,
  },
})
export default Store

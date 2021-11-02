import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { row: 'j', column: [1, -1, 2, 3, 4, 5, 6, 7, 8, 9, -1, 10] },
  { row: 'i', column: [1, 2, -1, 3, 4, 5, 6, 7, 8, 9, 10, -1, 11, 12] },
  {
    row: 'h',
    column: [1, 2, 3, -1, 4, 5, 6, 7, 8, 9, 10, 11, -1, 12, 13, 14],
  },
  { row: 'g', column: [1, 2, 3, -1, 4, 5, 6, 7, 8, 9, 10, 11, -1, 12, 13, 14] },
  { row: 'f', column: [1, 2, 3, -1, 4, 5, 6, 7, 8, 9, 10, 11, -1, 12, 13, 14] },
  { row: 'e', column: [1, 2, 3, -1, 4, 5, 6, 7, 8, 9, 10, 11, -1, 12, 13, 14] },
  { row: 'd', column: [1, 2, 3, -1, 4, 5, 6, 7, 8, 9, 10, 11, -1, 12, 13, 14] },
  { row: 'c', column: [1, 2, 3, -1, 4, 5, 6, 7, 8, 9, 10, 11, -1, 12, 13, 14] },
  { row: 'b', column: [1, 2, 3, -1, 4, 5, 6, 7, 8, 9, 10, 11, -1, 12, 13, 14] },
  { row: 'a', column: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
]
const SeatReducer = createSlice({
  name: 'seat',
  initialState,
  reducers: {},
})
const { reducer } = SeatReducer
export default reducer

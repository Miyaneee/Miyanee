import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'layout',
  initialState: {
    showSettings: false
  },
  reducers: {
    toggle(state, action) {
      const key = action.payload
      state[key] = !state[key]
    }
  }
})

export const { toggle } = slice.actions

export const selectLayout = state => state.layout

export default slice.reducer

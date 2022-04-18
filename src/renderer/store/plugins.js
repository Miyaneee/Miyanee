import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {
    name: 'DarkSouls Save Manager',
    index: 'E:/Projects/@miyaneee/miyanee/dist/build/index.html',
    icon: 'E:/Projects/@miyaneee/miyanee/dist/build/assets/icon.85a2e74e.ico',
    preload: 'E:/Projects/@miyaneee/miyanee/dist/build/preload.js'
  }
]

const slice = createSlice({
  name: 'plugins',
  initialState,
  reducers: {}
})

// export const {} = slice.actions

/**
 *
 * @param {*} state
 * @returns {typeof initialState}
 */
export const selectPlugins = state => state.plguins

export default slice.reducer

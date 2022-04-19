import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  show: '0',
  pages: [
    {
      key: '0',
      label: 'Home',
      component: 'Home',
      params: {}
    }
  ]
}

const slice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    closePage(state, { payload: index }) {
      state.pages.splice(parseInt(index), 1)
    },
    showPage(state, { payload }) {
      if (typeof payload === 'string') {
        state.show = payload
      }
      if (typeof payload === 'object') {
        const key = state.pages.length.toString()
        state.pages.push({ ...payload, key, component: 'Plugin' })
        state.show = key
      }
    }
  }
})

export const { closePage, showPage } = slice.actions

/**
 *
 * @param {*} state
 * @returns {typeof initialState}
 */
export const selectLayout = state => state.layout

export default slice.reducer

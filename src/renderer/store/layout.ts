import { createSlice } from '@reduxjs/toolkit'
import type { ViewerState } from '@/components/Viewer/Viewer'

type HomePage = {
  key: string
  label: string
}

export interface AppPage extends HomePage {
  params: ViewerState['params']
}

export type LayoutState = {
  show: string
  pages: [HomePage, ...AppPage[]]
}

const initialState: LayoutState = {
  show: '0',
  pages: [
    {
      key: '0',
      label: 'Home'
    }
  ]
}

const slice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    closePage(state, { payload: index }) {
      state.pages.splice(parseInt(index), 1)
      state.show = (index - 1).toString()
    },
    showPage(state, { payload }) {
      if (typeof payload === 'string') {
        state.show = payload
      }
      if (typeof payload === 'object') {
        const key = state.pages.length.toString()
        state.pages.push({ ...payload, key })
        state.show = key
      }
    }
  }
})

export const { closePage, showPage } = slice.actions

/**
 * Select layout state
 * @param {*} state
 * @returns {typeof initialState}
 */
export const selectLayout = (state: { layout: LayoutState }) => state.layout

export default slice.reducer

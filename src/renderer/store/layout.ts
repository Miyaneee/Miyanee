import { ViewerProps } from '@/features/Viewer/Viewer'
import { createSlice } from '@reduxjs/toolkit'
import { Store } from '.'

interface Layout {
  activeKey: number | string
  showSearch: boolean
  showSettings: boolean
  viewers: Viewer[]
}

interface Viewer {
  activeKey: number
  title: string
  props: ViewerProps
}

let i = 3

const slice = createSlice({
  name: 'layout',
  initialState: {
    activeKey: 1,
    showSearch: true,
    showSettings: false,
    viewers: []
  } as Layout,
  reducers: {
    handleActiveChange(state, { payload }: { payload: string | number }) {
      state.activeKey = payload
    },
    toggleSearch(state, { payload }: { payload: boolean }) {
      state.showSearch = payload
      state.activeKey = 1
    },
    createViewer(state, { payload }: { payload: Omit<Viewer, 'activeKey'> }) {
      const activeKey = i++
      state.viewers.push({ ...payload, activeKey })
      state.activeKey = activeKey
    }
  }
})

export const { createViewer, handleActiveChange, toggleSearch } = slice.actions

export default slice.reducer

export const selectLayout = (store: Store) => store.layout

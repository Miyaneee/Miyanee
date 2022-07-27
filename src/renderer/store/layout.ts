import { ViewerProps } from '@/features/Viewer/Viewer'
import { createSlice } from '@reduxjs/toolkit'
import { Store } from '.'

interface Layout {
  activeKey: number | string
  viewers: Viewer[]
}

interface Viewer {
  activeKey: number
  title: string
  props: ViewerProps
}

let i = 2

const slice = createSlice({
  name: 'layout',
  initialState: {
    activeKey: 0,
    viewers: []
  } as Layout,
  reducers: {
    handleActiveChange(state, { payload }: { payload: string | number }) {
      state.activeKey = payload
    },
    createViewer(state, { payload }: { payload: Omit<Viewer, 'activeKey'> }) {
      const activeKey = i++
      state.viewers.push({ ...payload, activeKey })
      state.activeKey = activeKey
    }
  }
})

export const { createViewer, handleActiveChange } = slice.actions

export default slice.reducer

export const selectLayout = (store: Store) => store.layout

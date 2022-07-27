import { createSlice } from '@reduxjs/toolkit'
import { Store } from '.'

export interface App {
  name: string
  description: string
  image: string
  index: string
  preload?: string
}

const slice = createSlice({
  name: 'app',
  initialState: [] as App[],
  reducers: {
    addApp(state, { payload }: { payload: App | App[] }) {
      state.push(...(Array.isArray(payload) ? payload : [payload]))
    }
  }
})

export const { addApp } = slice.actions

export default slice.reducer

export const selectApps = (store: Store) => store.apps

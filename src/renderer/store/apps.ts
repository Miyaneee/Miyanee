import { createSlice } from '@reduxjs/toolkit'
import { App } from '@shared/types'
import { Store } from '.'

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

import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'apps',
  initialState: [],
  reducers: {
    clearApps(state) {
      while (state[0]) {
        state.shift()
      }
    },
    getAllApps(state, { payload: apps }) {
      state.push(...apps)
    },
    startDownload(state, { payload }) {
      const index = state.findIndex(app => app.packageName === payload.packageName)
      if (index === -1) {
        state.push(payload)
      } else {
        state[index].downloading = true
      }
    },
    handleDownloadFail(state, { payload: packageName }) {
      const index = state.findIndex(app => app.packageName === packageName)
      const app = state[index]
      if (!app.ready) {
        state.splice(index, 1)
        return
      }
      state[index].downloading = false
    },
    handledownloadSuccess(state, { payload }) {
      const index = state.findIndex(app => app.packageName === payload.packageName)
      state[index] = { ...payload }
    }
  }
})

export const { clearApps, getAllApps, startDownload, handleDownloadFail, handledownloadSuccess } =
  slice.actions

/**
 * Select app state
 * @param {*} state
 * @returns {typeof initialState}
 */
export const selectApps = state => state.apps

export default slice.reducer

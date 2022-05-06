import { createSlice } from '@reduxjs/toolkit'
import { removeBy } from '@/utils'

const initialState = [
  // {
  //   name: 'DarkSouls Save Manager',
  //   packageName: '@miyaneee/image-to-base64',
  //   description:
  //     'Simple app of converting image to base64, support image file upload, clipborad data, net image url.',
  //   index: 'E:/Projects/@miyaneee/image-to-base64/dist/index.html',
  //   icon: 'E:/Projects/@miyaneee/image-to-base64/dist/assets/logo.75c2f664.png',
  //   preload: 'E:/Projects/@miyaneee/image-to-base64/dist/preload.js',
  //   ready: true
  // }
]

const slice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    startDownload(state, { payload }) {
      state.push(payload)
    },
    handleDownloadFail(state, { payload: packageName }) {
      removeBy(state, app => app.packageName === packageName)
    },
    handledownloadSuccess(state, { payload }) {
      let i = 0
      const { length } = state
      while (i < length) {
        if (state[i].packageName === payload.packageName) {
          state[i] = { ...payload }
          state[i].ready = true
          break
        }
        i++
      }
    }
  }
})

export const { startDownload, handleDownloadFail, handledownloadSuccess } = slice.actions

/**
 * Select app state
 * @param {*} state
 * @returns {typeof initialState}
 */
export const selectApps = state => state.apps

export default slice.reducer

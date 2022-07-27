import { ipcInvoke } from '@/utils/preload'
import { configureStore } from '@reduxjs/toolkit'
import apps, { addApp, App } from './apps'
import layout from './layout'

const store = configureStore({
  reducer: {
    apps,
    layout
  }
})

;(async () => {
  const apps = (await ipcInvoke('GET_APP')) as App[]
  store.dispatch(addApp(apps))
})()

export type Store = ReturnType<typeof store.getState>

export default store

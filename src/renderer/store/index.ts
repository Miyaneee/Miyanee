import { configureStore } from '@reduxjs/toolkit'
import layout from './layout'
import apps from './apps'

export default configureStore({
  reducer: {
    layout,
    apps
  }
})

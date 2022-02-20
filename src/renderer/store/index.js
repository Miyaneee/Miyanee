import { configureStore } from '@reduxjs/toolkit'
import layout from './layout'

export default configureStore({
  reducer: {
    layout
  }
})

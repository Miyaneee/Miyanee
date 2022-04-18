import { configureStore } from '@reduxjs/toolkit'
import layout from './layout'
import plguins from './plugins'

export default configureStore({
  reducer: {
    layout,
    plguins
  }
})

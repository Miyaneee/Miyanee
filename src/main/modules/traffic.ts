import { ipcMain, BrowserWindow } from 'electron'
import {
  WINDOW_MINIMIZE,
  WINDOW_MAXIMIZE,
  WINDOW_UNMAXIMIZE,
  WINDOW_CLOSE,
  IS_WINDOW_MAXIMIZE
} from '@shared/channelNames'

function traffic(win: BrowserWindow) {
  ipcMain.on(WINDOW_MINIMIZE, () => {
    win.minimize()
  })
  ipcMain.on(WINDOW_MAXIMIZE, () => {
    win.maximize()
  })
  ipcMain.on(WINDOW_UNMAXIMIZE, () => {
    win.unmaximize()
  })
  ipcMain.on(WINDOW_CLOSE, () => {
    win.close()
  })
  ipcMain.on(IS_WINDOW_MAXIMIZE, e => {
    e.returnValue = win.isMaximized()
  })
  win.on('maximize', () => {
    win.webContents.send(WINDOW_MAXIMIZE, true)
  })
  win.on('unmaximize', () => {
    win.webContents.send(WINDOW_UNMAXIMIZE, true)
  })
}

export default traffic

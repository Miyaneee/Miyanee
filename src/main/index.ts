import { app, BrowserWindow } from 'electron'
import { isDev, indexPath, preloadPath } from './config'
import menu from './modules/menu'

app.whenReady().then(() => {
  const win = new BrowserWindow({
    minWidth: 1000,
    minHeight: 800,
    center: true,
    frame: false,
    webPreferences: {
      preload: preloadPath,
      webviewTag: true,
      devTools: isDev
    }
  })

  if (isDev) {
    win.webContents.openDevTools()
  }
  win.loadURL(indexPath)
  win.setMenu(menu)
})

app.on('window-all-closed', app.quit)

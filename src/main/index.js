import { app, BrowserWindow } from 'electron'
import { homeUrl, preloadUrl } from './config'
import os from 'os'

app.whenReady().then(() => {
  const win = new BrowserWindow({
    webPreferences: {
      devTools: true,
      preload: preloadUrl
    }
  })
  win.loadURL(homeUrl)
})

app.on('window-all-closed', () => {
  if (os.platform !== 'darwin') {
    app.quit()
  }
})

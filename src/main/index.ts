import { app, BrowserWindow } from 'electron'

app.whenReady().then(() => {
  const win = new BrowserWindow()
  win.loadURL('http://localhost:5173')
})

app.on('window-all-closed', app.quit)

import { app, BrowserWindow, ipcMain } from 'electron'
import { homeUrl, preloadUrl } from '@/config'
import os from 'os'
import { REQUEST_CHANNEL, DOWNLOAD_CHANNEL } from '@shared'
import { request, downloadApp } from '@/utils'

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 1600,
    height: 800,
    webPreferences: {
      devTools: true,
      preload: preloadUrl,
      webviewTag: true
    }
  })
  win.loadURL(homeUrl)
  win.webContents.openDevTools()

  ipcMain.on(REQUEST_CHANNEL, async (event, config) => {
    const { id, url, ...params } = config
    const [err, res] = await request(url, params)
    let reply

    if (err) {
      reply = { ...JSON.parse(JSON.stringify(err)), config }
    } else {
      const { status } = res
      reply = { config, status, data: await res.json() }
    }
    event.reply(REQUEST_CHANNEL + id, reply)
  })

  ipcMain.on(DOWNLOAD_CHANNEL, async (event, config) => {
    const { id, object } = config
    const data = await downloadApp(object)

    event.reply(DOWNLOAD_CHANNEL + id, data)
  })
})

app.on('window-all-closed', () => {
  if (os.platform !== 'darwin') {
    app.quit()
  }
})

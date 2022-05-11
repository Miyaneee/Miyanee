import { app, BrowserWindow, ipcMain } from 'electron'
import { homeUrl, preloadUrl } from '@/config'
import os from 'os'
import {
  REQUEST_CHANNEL,
  DOWNLOAD_CHANNEL,
  GET_APP_LIST_CHANNEL,
  UNINSTALL_APP_CHANNEL
} from '@shared'
import { request, downloadApp, parseApp, addApp, getApps, removeApp, uninstallApp } from '@/utils'

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

  /** Request */
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
  /** Download */
  ipcMain.on(DOWNLOAD_CHANNEL, async (event, config) => {
    const { id, object } = config
    const appPath = await downloadApp(object)
    if (!appPath) {
      event.reply(DOWNLOAD_CHANNEL + id, false)
      return
    }
    const data = await parseApp(appPath, object)
    const success = addApp(data)
    event.reply(DOWNLOAD_CHANNEL + id, success && data)
  })
  /** Uninstall */
  ipcMain.on(UNINSTALL_APP_CHANNEL, (event, config) => {
    const { id, appInfo } = config
    removeApp(appInfo)
    uninstallApp(appInfo)
    event.reply(UNINSTALL_APP_CHANNEL + id)
  })
  /** Get app list */
  ipcMain.on(GET_APP_LIST_CHANNEL, async (event, id) => {
    const appInfo = getApps()
    event.reply(GET_APP_LIST_CHANNEL + id, appInfo)
  })
})

app.on('window-all-closed', () => {
  if (os.platform !== 'darwin') {
    app.quit()
  }
})

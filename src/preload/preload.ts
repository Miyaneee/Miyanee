import { contextBridge, ipcRenderer } from 'electron'
import { version } from '@@/package.json'

contextBridge.exposeInMainWorld('miyanee', {
  version,
  send(channel, data) {
    ipcRenderer.send(channel, data)
  },
  on(channel, callback) {
    ipcRenderer.on(channel, callback)
  },
  once(channel, callback) {
    ipcRenderer.once(channel, callback)
  },
  removeAllListeneers(channel) {
    ipcRenderer.removeAllListeners(channel)
  }
})

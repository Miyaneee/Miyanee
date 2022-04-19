import { contextBridge, ipcRenderer } from 'electron'
import { version } from '@@/package.json'

contextBridge.exposeInMainWorld('miyanee', {
  version,
  renderer: {
    /**
     * Send to main process
     * @param {string} channel
     * @param {*} data
     */
    send(channel, data) {
      ipcRenderer.send(channel, data)
    },
    /**
     * Watch channel
     * @param {string} channel
     * @param {function} callback
     */
    on(channel, callback) {
      ipcRenderer.on(channel, callback)
    },
    /**
     * Watch channel once
     * @param {string} channel
     * @param {function} callback
     */
    once(channel, callback) {
      ipcRenderer.once(channel, callback)
    },
    /**
     * Remove all listeners of a channel
     * @param {string} channel
     */
    removeAllListeneers(channel) {
      ipcRenderer.removeAllListeners(channel)
    }
  }
})

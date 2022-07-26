import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'
import { version } from '@@/package.json'

contextBridge.exposeInMainWorld('miyanee', {
  version,
  ipcSend(channel: string, ...data: any[]) {
    ipcRenderer.send(channel, ...data)
  },
  ipcSendSync(channel: string, ...data: any[]) {
    return ipcRenderer.sendSync(channel, ...data)
  },
  ipcOn(channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) {
    ipcRenderer.on(channel, listener)
  },
  ipcOnce(channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) {
    ipcRenderer.once(channel, listener)
  },
  ipcOff(channel: string) {
    ipcRenderer.removeAllListeners(channel)
  }
})

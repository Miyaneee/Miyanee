import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'
import { version } from '@@/package.json'
import { IpcChannels } from '@shared/channelNames'

contextBridge.exposeInMainWorld('miyanee', {
  version,
  ipcInvoke(channel: IpcChannels, ...data: any[]) {
    return ipcRenderer.invoke(channel, ...data)
  },
  ipcSend(channel: IpcChannels, ...data: any[]) {
    ipcRenderer.send(channel, ...data)
  },
  ipcSendSync(channel: IpcChannels, ...data: any[]) {
    return ipcRenderer.sendSync(channel, ...data)
  },
  ipcOn(channel: IpcChannels, listener: (event: IpcRendererEvent, ...args: any[]) => void) {
    ipcRenderer.on(channel, listener)
  },
  ipcOnce(channel: IpcChannels, listener: (event: IpcRendererEvent, ...args: any[]) => void) {
    ipcRenderer.once(channel, listener)
  },
  ipcOff(channel: IpcChannels) {
    ipcRenderer.removeAllListeners(channel)
  }
})

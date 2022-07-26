type IpcChannel = import('../shared/channelNames').IpcChannels

type IpcListener = (event: Electron.IpcRendererEvent, ...args: any[]) => void

interface Miyanee {
  readonly version: string
  ipcSend(channel: IpcChannel, ...data: any[]): void
  ipcSendSync(channel: IpcChannel, ...data: any[]): any
  ipcOn(channel: IpcChannel, listener: IpcListener): void
  ipcOnce(channel: IpcChannel, listener: IpcListener): void
  ipcOff(channel: IpcChannel): void
}

interface Window {
  readonly miyanee: Miyanee
}

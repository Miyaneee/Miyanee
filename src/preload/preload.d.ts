type IpcChannel =
  | 'WINDOW_MINIMIZE'
  | 'WINDOW_MAXIMIZE'
  | 'WINDOW_UNMAXIMIZE'
  | 'WINDOW_CLOSE'
  | 'IS_WINDOW_MAXIMIZE'

type IpcListener = (event: Electron.IpcRendererEvent, ...args: any[]) => void

interface Miyanee {
  readonly version: string
  readonly ipcSend(channel: IpcChannel, ...data: any[]): void
  readonly ipcSendSync(channel: IpcChannel, ...data: any[]): any
  readonly ipcOn(channel: IpcChannel, listener: IpcListener): void
  readonly ipcOnce(channel: IpcChannel, listener: IpcListener): void
  readonly ipcOff(channel: IpcChannel): void
}

interface Window {
  readonly miyanee: Miyanee
}

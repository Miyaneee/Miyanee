type IpcCabllack = (event: Electron.IpcRendererEvent, ...args: any[]) => void

interface RendererUtils {
  send(channel: string, data: any): void
  on(channel: string, callback: IpcCabllack): void
  once(channel: string, callback: IpcCabllack): void
  removeAllListeneers(channel: string): void
}

interface Miyanee extends RendererUtils {
  readonly version: string
}

interface Window {
  readonly miyanee: Miyanee
}

import { getApp, removeApp } from '@/utils/store'
import { GET_APP, REMOVE_APP } from '@shared/channelNames'
import { ipcMain } from 'electron'

export default function appManager() {
  ipcMain.handle(GET_APP, (_, packageName?: string) => {
    return getApp(packageName)
  })
  ipcMain.handle(REMOVE_APP, (_, packageName: string) => {
    return removeApp(packageName)
  })
}

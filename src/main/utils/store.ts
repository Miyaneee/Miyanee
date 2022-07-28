import Store from 'electron-store'
import { appPath } from '@/config'
import { App } from '@shared/types'

export const appStore = new Store<Record<string, App>>({
  name: 'apps',
  defaults: {},
  cwd: appPath,
  clearInvalidConfig: true
})

export function getApp(): App[]
export function getApp(packageName?: string): App
export function getApp(packageName?: string) {
  if (packageName) {
    return appStore.get(packageName)
  }
  const apps = []
  for (const [, app] of appStore) {
    apps.push(app)
  }
  return apps
}

export function setApp(app: App) {
  try {
    const { packageName } = app
    appStore.set(packageName, app)
    return true
  } catch (err) {
    return false
  }
}

export function removeApp(packageName: string) {
  try {
    appStore.delete(packageName)
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

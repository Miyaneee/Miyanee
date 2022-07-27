import Store from 'electron-store'
import { appPath } from '@/config'
import { MiayneeApp } from '@shared/types'

export const appStore = new Store<Record<string, MiayneeApp>>({
  name: 'apps',
  defaults: {},
  cwd: appPath,
  clearInvalidConfig: true
})

export function getApp(): MiayneeApp[]
export function getApp(packageName?: string): MiayneeApp
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

export function setApp(app: MiayneeApp) {
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

import Store from 'electron-store'
import { appPath } from '../config'

export const appStore = new Store({
  name: 'apps',
  defaults: {},
  cwd: appPath,
  clearInvalidConfig: true
})

/**
 * Get all apps
 */
export function getApps() {
  const appInfo = []
  for (const [, app] of appStore) {
    appInfo.push(app)
  }
  return appInfo
}

/**
 * Add app info
 * @param {object} appInfo
 */
export function addApp(appInfo) {
  try {
    const { packageName } = appInfo
    appStore.set(packageName, appInfo)
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

import { rendererSend, rendererOnce } from './preload'
import { DOWNLOAD_CHANNEL, GET_APP_LIST_CHANNEL, UNINSTALL_APP_CHANNEL } from '@shared'
import { v4 as uuid } from 'uuid'

/**
 * Get all apps
 */
export function getApps() {
  return new Promise(reslove => {
    const id = uuid()
    rendererSend(GET_APP_LIST_CHANNEL, id)
    rendererOnce(GET_APP_LIST_CHANNEL + id, (_, data) => {
      reslove(data)
    })
  })
}

/**
 * Download miyanee app
 * @param {object} object
 */
export function downloadApp(object) {
  return new Promise(reslove => {
    const id = uuid()
    rendererSend(DOWNLOAD_CHANNEL, { id, object })
    rendererOnce(DOWNLOAD_CHANNEL + id, (_, data) => {
      reslove(data)
    })
  })
}

/**
 * Uninstall miyanee app
 * @param {object} appInfo
 */
export function uninstallApp(appInfo) {
  return new Promise(reslove => {
    const id = uuid()
    rendererSend(UNINSTALL_APP_CHANNEL, { id, appInfo })
    rendererOnce(UNINSTALL_APP_CHANNEL + id, () => {
      reslove(true)
    })
  })
}

/**
 * Remove item from array
 * @param {array} arr
 * @param {function} fn
 */
export function removeBy(arr, fn) {
  let i = 0
  const { length } = arr
  while (i < length) {
    if (fn(arr[i], i)) {
      arr.splice(i, 1)
      break
    }
    i++
  }
}

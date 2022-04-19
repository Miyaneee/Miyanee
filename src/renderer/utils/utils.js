import { rendererSend, rendererOnce } from './preload'
import { DOWNLOAD_CHANNEL } from '@shared'
import { v4 as uuid } from 'uuid'

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

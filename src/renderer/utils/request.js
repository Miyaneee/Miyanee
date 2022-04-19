import { rendererOnce, rendererSend } from './preload'
import { REQUEST_CHANNEL } from '@shared'
import { v4 as uuid } from 'uuid'

/**
 * Request
 * @param {string} url
 * @param {import('node-fetch').RequestInit} params
 */
export function request(url, params) {
  return new Promise(reslove => {
    const id = uuid()
    rendererSend(REQUEST_CHANNEL, {
      id,
      url,
      ...params
    })
    rendererOnce(REQUEST_CHANNEL + id, (_, reply) => {
      reslove(reply.errno ? [reply] : [null, reply])
    })
  })
}

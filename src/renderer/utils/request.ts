import { rendererOnce, rendererSend } from './preload'
import { REQUEST_CHANNEL } from '@shared'
import { v4 as uuid } from 'uuid'
import type { RequestInit, FetchError } from 'node-fetch'

/**
 * Request
 * @param url
 * @param params
 */
export function request(
  url: string,
  params: RequestInit = {}
): Promise<[FetchError] | [null, any]> {
  return new Promise(reslove => {
    const id = uuid()
    rendererSend(REQUEST_CHANNEL, {
      id,
      url,
      ...params
    })
    rendererOnce(REQUEST_CHANNEL + id, (_, reply: [FetchError] | [null, any]) => {
      // console.log(reply)
      reslove(reply)
    })
  })
}

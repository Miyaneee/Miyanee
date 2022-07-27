import { ipcInvoke } from './preload'
import { RequestInit, FetchError } from 'node-fetch'
import { REQUEST } from '@shared/channelNames'

interface requestOptions extends RequestInit {
  url: string
}

export default function request(
  options: requestOptions
): Promise<Promise<[null, Response] | [FetchError]>> {
  return ipcInvoke(REQUEST, options)
}

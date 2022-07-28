import { ipcInvoke } from './preload'
import { RequestInit, FetchError } from 'node-fetch'
import { REQUEST } from '@shared/channelNames'

interface requestOptions extends RequestInit {
  url: string
}

export default function request<T extends Record<string, any>>(
  options: requestOptions
): Promise<Promise<[null, T] | [FetchError]>> {
  return ipcInvoke(REQUEST, options)
}

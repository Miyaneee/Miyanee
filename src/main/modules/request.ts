import { REQUEST } from '@shared/channelNames'
import { ipcMain } from 'electron'
import nodeFetch, { FetchError, RequestInit, Response } from 'node-fetch'

function fetch(url: string, options: RequestInit): Promise<[null, Response] | [FetchError]> {
  return new Promise((reslove, reject) => {
    nodeFetch(url, options)
      .then(res => reslove([null, res]))
      .catch(err => reject([err as FetchError]))
  })
}

type RequestData = { id: number; url: string } & RequestInit

export default function request() {
  ipcMain.handle(REQUEST, async (_, { url, ...options }: RequestData) => {
    const [err, res] = await fetch(url, options)
    if (err) {
      return [JSON.parse(JSON.stringify(err))]
    }
    const data = await res.json()
    return [null, data]
  })
}

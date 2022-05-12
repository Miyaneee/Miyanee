import fetch, { RequestInit, Response, FetchError } from 'node-fetch'
import { getSystemProxy } from 'os-proxy-config'
import createHttpsProxyAgent from 'https-proxy-agent'

async function getAgent() {
  const proxy = await getSystemProxy()
  if (!proxy) return undefined
  return createHttpsProxyAgent(proxy.proxyUrl)
}

/**
 * Request
 * @param url
 * @param params
 */
export async function request(
  url: string,
  params: RequestInit
): Promise<[null, Response] | [FetchError]> {
  try {
    const res = await fetch(url, {
      ...params,
      agent: await getAgent()
    })
    return [null, res]
  } catch (err) {
    return [err as FetchError]
  }
}

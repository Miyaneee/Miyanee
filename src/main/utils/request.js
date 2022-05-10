import fetch from 'node-fetch'
import { getSystemProxy } from 'os-proxy-config'
import HttpsProxyAgent from 'https-proxy-agent'

async function getAgent() {
  const proxy = await getSystemProxy()
  if (!proxy) return undefined
  return new HttpsProxyAgent(proxy.proxyUrl)
}

/**
 * Request
 * @param {import('node-fetch').RequestInfo} url
 * @param {import('node-fetch').RequestInit} params
 * @returns {Promise<[*]|[null,import('node-fetch').Response]>}
 */
export async function request(url, params) {
  try {
    const res = await fetch(url, {
      ...params,
      agent: await getAgent()
    })
    return [null, res]
  } catch (err) {
    return [err]
  }
}

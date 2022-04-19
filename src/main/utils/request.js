import fetch from 'node-fetch'

/**
 * Request
 * @param {import('node-fetch').RequestInfo} url
 * @param {import('node-fetch').RequestInit} params
 * @returns {Promise<[*]|[null,import('node-fetch').Response]>}
 */
export function request(url, params) {
  return new Promise(reslove => {
    fetch(url, params)
      .then(res => {
        reslove([null, res])
      })
      .catch(err => {
        reslove([err])
      })
  })
}

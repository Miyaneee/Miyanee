import { mkdir, cp, access, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { tgz } from 'compressing'
import fetch from 'node-fetch'
import { appPath } from '../config'

/**
 * Download miyanee app
 * @param {object} object
 */
export async function downloadApp(object) {
  const { name, scope, version } = object.package
  const withScope = scope !== 'unscoped'
  const nameStr = withScope ? name.split('/')[1] : name
  const url = `https://registry.npmjs.org/${name}/-/${nameStr}-${version}.tgz`

  const response = await fetch(url)

  if (!response.ok) {
    return false
  }

  const author = getAuthor(object)
  const path = join(appPath, `${author}.${nameStr}`)

  await createIfNotExit(appPath)
  await tgz.uncompress(response.body, path)
  await cp(join(path, 'package'), path, { recursive: true })

  return path
}

/**
 * Parse miyanee.json to get app info
 * @param {string} path
 */
export async function parseApp(path, object) {
  let data = {}
  try {
    const jsonPath = join(path, 'miyanee.json')
    const buffer = await readFile(jsonPath)
    const json = JSON.parse(buffer.toString())

    data = {
      ...json,
      index: join(path, json.index),
      preload: join(path, json.preload),
      isOffical: path.includes('miyaneee.'),
      author: json.author || getAuthor(object),
      packageName: object.package.name,
      version: object.package.version,
      ready: true
    }
    // eslint-disable-next-line no-empty
  } catch {}

  return data
}

/**
 * Get author of app
 * @param {object} object
 */
function getAuthor(object) {
  const { scope, author, publisher } = object.package
  let result
  if (scope !== 'unscoped') {
    result = scope
  } else if (author?.name) {
    result = author.name
  } else {
    result = publisher.username
  }

  return result.replaceAll(' ', '-').toLowerCase()
}

/**
 * Create dir if it doesn't exist
 * @param {string} path
 */
export async function createIfNotExit(path) {
  try {
    await access(path)
  } catch {
    await mkdir(path, { recursive: true })
  }
}

import { mkdir, cp, access, readFile, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { tgz, sourceType } from 'compressing'
import fetch from 'node-fetch'
import { NpmObject, MiayneeAppConfig, AppInfo } from '@shared'
import { appPath } from '../config'

/**
 * Download miyanee app
 * @param object
 */
export async function downloadApp(object: NpmObject) {
  const { name, scope, version } = object.package
  const withScope = scope !== 'unscoped'
  const nameStr = withScope ? name.split('/')[1] : name
  const url = `https://registry.npmjs.org/${name}/-/${nameStr}-${version}.tgz`

  const response = await fetch(url)

  if (!response.ok || !response.body) {
    return false
  }

  const author = getAuthor(object)
  const path = join(appPath, `${author}.${nameStr}`)

  await createIfNotExit(appPath)
  await tgz.uncompress(response.body as sourceType, path)
  await cp(join(path, 'package'), path, { recursive: true })

  return path
}

/**
 * Parse miyanee.json to get app info
 * @param path
 */
export async function parseApp(path: string, object: NpmObject) {
  let data = {} as AppInfo
  try {
    const jsonPath = join(path, 'miyanee.json')
    const buffer = await readFile(jsonPath)
    const json: MiayneeAppConfig = JSON.parse(buffer.toString())

    data = {
      ...json,
      index: join(path, json.index),
      isOffical: path.includes('miyaneee.'),
      author: json.author || getAuthor(object),
      packageName: object.package.name,
      version: object.package.version,
      dir: path,
      ready: true
    }
    if (json.preload) data.preload = join(path, json.preload)
  } catch (err) {
    console.error(err)
  }

  return data
}

/**
 * Get author of app
 * @param object
 */
function getAuthor(object: NpmObject) {
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
 * @param path
 */
export async function createIfNotExit(path: string) {
  try {
    await access(path)
  } catch {
    await mkdir(path, { recursive: true })
  }
}

/**
 * Uninstall app
 * @param {object} appInfo
 */
export async function uninstallApp(appInfo: AppInfo) {
  const { dir } = appInfo
  try {
    rm(dir, { recursive: true, force: true })
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

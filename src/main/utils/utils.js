import { mkdir, cp, readdir, access } from 'node:fs/promises'
import { join } from 'node:path'
import fetch from 'node-fetch'
import { tgz } from 'compressing'
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

  return true
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

export async function getApps(path = appPath, scope = '') {
  const results = []
  const files = await readdir(path, { withFileTypes: true })
  for (const file of files) {
    if (!file.isDirectory()) continue
    if (file.name.startsWith('@')) {
      results.push(...(await getApps(join(path, file.name), file.name)))
      continue
    }
    results.push(`${scope ? scope + '/' : ''}${file.name}`)
  }
  return results
}

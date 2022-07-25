const { writeFile } = require('node:fs/promises')
const { join } = require('node:path')

const electronRelease = process.versions

const node = electronRelease.node.split('.')[0]
const chrome = electronRelease.v8.split('.').splice(0, 2).join('')

writeFile(join(__dirname, '../src/shared/targets.json'), JSON.stringify({ chrome, node }))
writeFile(join(__dirname, '../.browserslistrc'), `Chrome ${chrome}`)

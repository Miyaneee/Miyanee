const { version } = require('electron/package.json')

module.exports = {
  productName: 'Miyanee',
  appId: 'com.electron.Miyanee',
  asar: true,
  files: ['dist/build', 'resources', 'package.json'],
  removePackageScripts: true,
  win: {
    target: ['nsis']
  },
  directories: {
    buildResources: 'resources',
    output: 'dist'
  },
  extraMetadata: {
    main: 'dist/build/index.js'
  },
  electronDownload: {
    customDir: `v${version}`
  }
}

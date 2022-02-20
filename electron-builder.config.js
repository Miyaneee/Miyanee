const { version } = require('electron/package.json')

module.exports = {
  productName: 'Miyaneee',
  appId: 'org.miyaneee.Miyaneee',
  asar: true,
  files: ['dist/build', 'resources', 'package.json'],
  removePackageScripts: true,
  afterSign: 'scripts/notarize.js',
  mac: {
    target: {
      target: 'default',
      arch: ['arm64', 'x64']
    },
    type: 'distribution',
    hardenedRuntime: true,
    entitlements: 'resources/entitlements.mac.plist',
    entitlementsInherit: 'resources/entitlements.mac.plist',
    gatekeeperAssess: false
  },
  dmg: {
    contents: [
      {
        x: 130,
        y: 220
      },
      {
        x: 410,
        y: 220,
        type: 'link',
        path: '/Applications'
      }
    ]
  },
  win: {
    target: ['nsis']
  },
  linux: {
    target: ['AppImage'],
    category: 'Development'
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

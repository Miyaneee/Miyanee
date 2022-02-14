const path = require('path')

const config = {
  target: 'electron-main',
  entry: './main/index.js',
  output: {
    path: path.resolve(__dirname, 'release/app'),
    filename: 'index.js'
  },
  node: {
    __dirname: false
  },
  mode: 'production'
}

module.exports = config

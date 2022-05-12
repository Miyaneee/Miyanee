const fs = require('fs')
const path = require('path')

fs.rm(path.join(__dirname, '../dist'), { recursive: true }, () => void 0)

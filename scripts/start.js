const concurrently = require('concurrently')
const { config } = require('dotenv')

config()

const port = process.env.PORT

concurrently([
  { command: `wait-on -c wait-on.json http-get://localhost:${port} && npm run start:main` },
  { command: 'npm run start:renderer' }
])

import path from 'node:path'
import os from 'node:os'

const isDev = import.meta.env.DEV

export const homeUrl = isDev
  ? import.meta.env.VITE_DEV_SERVER_URL
  : `file://${path.join(__dirname, 'index.html')}`

export const preloadUrl = path.join(__dirname, 'preload.js')

export const appPath = path.join(os.homedir(), '.miyanee')

import { join } from 'node:path'
import { homedir } from 'node:os'

export const isDev = import.meta.env.DEV

export const indexPath = isDev
  ? (import.meta.env.VITE_DEV_SERVER_URL as string)
  : `file://${join(__dirname, 'index.html')}`

export const preloadPath = join(__dirname, 'preload.js')

export const appPath = join(homedir(), '.miyanee')

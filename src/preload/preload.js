import { contextBridge } from 'electron'
import { version } from '../../package.json'

contextBridge.exposeInMainWorld('miyanee', {
  version
})

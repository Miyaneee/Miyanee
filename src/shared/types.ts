import { RequestInit } from 'node-fetch'

type NpmObjPackage = {
  name: string
  scope: string
  version: string
  description?: string
  keywords?: string[]
  author?: {
    name?: string
    email?: string
    url?: string
    username?: string
  }
  publisher: {
    username: string
    email: string
  }
}

type NpmObjScore = {
  final: number
  detail: {
    quality: number
    popularity: number
    maintenance: number
  }
}

export type NpmObject = {
  package: NpmObjPackage
  flags?: {
    unstable: boolean
  }
  score: NpmObjScore
  searchScore: number
}

export type NpmSearchResult = {
  total: number
  time: string
  objects: NpmObject[]
}

export type MiayneeAppConfig = {
  name: string
  description?: string
  index: string
  preload?: string
  author?: string
  keywords?: string[]
}

export interface AppInfo extends MiayneeAppConfig {
  isOffical: boolean
  packageName: string
  version: string
  dir: string
  ready: boolean
}

export interface IpcRequestOptions extends RequestInit {
  id: string
  url: string
}

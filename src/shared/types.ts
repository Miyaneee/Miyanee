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

export type NpmObject = {
  package: NpmObjPackage
  flags?: {
    unstable: boolean
  }
  score: {
    final: number
    detail: {
      quality: number
      popularity: number
      maintenance: number
    }
  }
  searchScore: number
}

export type NpmSearchResult = {
  total: number
  time: string
  objects: NpmObject[]
}

export type MiyaneeAppConfig = {
  name: string
  description?: string
  index: string
  preload?: string
  author: string
  keywords?: string[]
}

export type MiayneeApp = MiyaneeAppConfig & {
  isOffical: boolean
  packageName: string
  version: string
  dir: string
}

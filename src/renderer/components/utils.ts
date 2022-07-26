import { Children, ReactElement, ReactNode, JSXElementConstructor } from 'react'

export function filterFalsyChildren(children: ReactNode) {
  return (Children.toArray(children) as ReactElement[]).filter(Boolean)
}

export function filterChildrenByType<T>(
  children: ReactNode,
  type: JSXElementConstructor<T> | JSXElementConstructor<T>[]
): ReactElement<T, string | JSXElementConstructor<T>>[] {
  return (Children.toArray(children) as ReactElement[]).filter(item =>
    Array.isArray(type) ? type.some(component => component === item.type) : item.type === type
  )
}

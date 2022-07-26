import { PropsWithChildren } from 'react'

interface TabItemProps extends PropsWithChildren {
  title: string
  activeKey: string | number
}

function TabItem(props: TabItemProps) {
  return <>{props.children}</>
}

export default TabItem

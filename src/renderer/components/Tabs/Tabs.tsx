import { useState, PropsWithChildren, useEffect } from 'react'
import TabItem from './TabItem'
import cx from 'clsx'
import { filterChildrenByType } from '@/components/utils'
import './Tabs.less'

interface TabsProps extends PropsWithChildren {
  activeKey?: string | number
  onActive?: (key: string | number) => void
}

function createIsMountedObj(
  items: { props: { activeKey: string | number } }[],
  current: string | number
) {
  const obj: Record<string, boolean> = {}
  items.forEach(item => {
    obj[item.props.activeKey] = item.props.activeKey === current
  })
  return obj
}

function Tabs(props: TabsProps) {
  const { children, activeKey, onActive } = props
  const items = filterChildrenByType(children, TabItem)
  const [active, setActive] = useState(activeKey ?? items[0].props.activeKey)
  const [isMountedObj, setIsMountedObj] = useState(createIsMountedObj(items, active))

  function handleClick(activeKey: string | number) {
    setActive(activeKey)
    if (onActive) onActive(activeKey)
  }

  useEffect(() => {
    if (activeKey === undefined || activeKey === active) return
    setActive(activeKey)
  }, [activeKey, active])

  useEffect(() => {
    if (isMountedObj[active]) return
    const newMount = { ...isMountedObj }
    newMount[active] = true
    setIsMountedObj(newMount)
  }, [active, isMountedObj])

  return (
    <div className="Tabs">
      <div className="header">
        {items.map(({ props }) => (
          <button
            key={props.activeKey}
            className={cx(active === props.activeKey && 'active')}
            onClick={() => handleClick(props.activeKey)}
          >
            {props.title}
          </button>
        ))}
      </div>
      <div>
        {items.map(({ props }) =>
          isMountedObj[props.activeKey] ? (
            <div
              key={props.activeKey}
              style={{ display: active === props.activeKey ? 'block' : 'none' }}
            >
              {props.children}
            </div>
          ) : null
        )}
      </div>
    </div>
  )
}

Tabs.Item = TabItem

export default Tabs

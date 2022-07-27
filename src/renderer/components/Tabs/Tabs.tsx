import { useState, useEffect, PropsWithChildren } from 'react'
import TabItem from './TabItem'
import cx from 'clsx'
import { filterChildrenByType } from '@/components/utils'
import './Tabs.less'

interface TabsProps extends PropsWithChildren {
  activeKey?: string | number
  onActive?: (key: string | number) => void
}

function createIsMountedObj(items: { props: { activeKey: string | number } }[]) {
  const obj: Record<string, boolean> = {}
  items.forEach((item, i) => {
    obj[item.props.activeKey] = !i
  })
  return obj
}

function Tabs(props: TabsProps) {
  const { children, onActive } = props
  const items = filterChildrenByType(children, TabItem)
  const [activeKey, setActiveKey] = useState(props.activeKey ?? items[0].props.activeKey)
  const [isMountedObj, setIsMountedObj] = useState(createIsMountedObj(items))

  useEffect(() => {
    const { activeKey } = props
    if (activeKey !== undefined) {
      setActiveKey(activeKey)
      if (!isMountedObj[activeKey]) {
        const newMount = { ...isMountedObj }
        newMount[activeKey] = true
        setIsMountedObj(newMount)
      }
    }
  }, [props.activeKey])

  function handleClick(activeKey: string | number) {
    setActiveKey(activeKey)
    if (!isMountedObj[activeKey]) {
      const newMount = { ...isMountedObj }
      newMount[activeKey] = true
      setIsMountedObj(newMount)
    }
    if (onActive) onActive(activeKey)
  }

  return (
    <div className="Tabs">
      <div className="header">
        {items.map(({ props }) => (
          <button
            key={props.activeKey}
            className={cx(activeKey === props.activeKey && 'active')}
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
              style={{ display: activeKey === props.activeKey ? 'block' : 'none' }}
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

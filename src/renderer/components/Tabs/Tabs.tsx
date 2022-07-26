import { useState, PropsWithChildren } from 'react'
import TabItem from './TabItem'
import cx from 'clsx'
import { filterChildrenByType } from '@/components/utils'
import './Tabs.less'

interface TabsProps extends PropsWithChildren {
  onActive?: (key: string | number) => void
}

function Tabs(props: TabsProps) {
  const { children, onActive } = props
  const items = filterChildrenByType(children, TabItem)
  const [activeKey, setActiveKey] = useState(items[0].props.activeKey)
  const [mount, setMount] = useState([true, ...new Array(items.length - 1).fill(false)])

  function handleClick(activeKey: string | number, index: number) {
    setActiveKey(activeKey)
    if (!mount[index]) {
      const newMount = [...mount]
      newMount[index] = true
      setMount(newMount)
    }
    if (onActive) onActive(activeKey)
  }

  return (
    <div className="Tabs">
      <div className="header">
        {items.map(({ props }, i) => (
          <button
            key={props.activeKey}
            className={cx(activeKey === props.activeKey && 'active')}
            onClick={() => handleClick(props.activeKey, i)}
          >
            {props.title}
          </button>
        ))}
      </div>
      <div>
        {items.map(({ props }, i) =>
          mount[i] ? (
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

import { memo } from 'react'

function Plugin({ show, plugin }) {
  return (
    <div
      className="Plugin"
      style={{
        display: show ? '' : 'none'
      }}
    >
      <h1>Plugin</h1>
    </div>
  )
}

export default memo(Plugin)

import { memo } from 'react'
import cls from 'classnames'
import './Viewer.less'

function Viewer({ show, params }) {
  return (
    <div className={cls('Viewer', { hide: !show })}>
      <webview src={params.index} preload={params.preload} />
    </div>
  )
}

export default memo(Viewer)

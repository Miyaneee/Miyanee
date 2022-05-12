import { FC, memo } from 'react'
import cls from 'classnames'
import './Viewer.less'

export type ViewerState = {
  show?: boolean
  params: {
    index: string
    preload?: string
  }
}

const Viewer: FC<ViewerState> = ({ show, params }) => {
  return (
    <div className={cls('Viewer', { hide: !show })}>
      <webview src={params.index} preload={params.preload} />
    </div>
  )
}

export default memo(Viewer)

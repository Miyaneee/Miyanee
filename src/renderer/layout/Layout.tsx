import { PropsWithChildren } from 'react'
import TitleBar from './titleBar/TitleBar'
import './Layout.less'

function Layout(props: PropsWithChildren) {
  return (
    <div className="Layout">
      <TitleBar />
      <div className="content">{props.children}</div>
    </div>
  )
}
export default Layout

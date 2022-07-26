import { PropsWithChildren } from 'react'
import TitleBar from './titleBar/TitleBar'

function Layout(props: PropsWithChildren) {
  const { children } = props
  return (
    <div>
      <TitleBar />
      {children}
    </div>
  )
}
export default Layout

import { Suspense, lazy } from 'react'
import Nav from '@rsuite/responsive-nav'
import { Reload } from '@rsuite/icons'
import { useSelector, useDispatch } from 'react-redux'
import { selectLayout, showPage, closePage } from '@/store/layout'
import Home from '@/components/Home/Home'
import '@/App.less'

const Viewer = lazy(() => import('@/components/Viewer/Viewer'))

function App() {
  const layout = useSelector(selectLayout)
  const dispath = useDispatch()
  return (
    <div className="App">
      <Nav
        removable
        appearance="tabs"
        moreText="More..."
        activeKey={layout.show}
        onSelect={key => dispath(showPage(key))}
        onItemRemove={key => dispath(closePage(key))}
      >
        {layout.pages.map(item => (
          <Nav.Item key={item.key} eventKey={item.key}>
            {item.label}
          </Nav.Item>
        ))}
      </Nav>
      <div className="content">
        <Suspense fallback={<Reload spin />}>
          {layout.pages.map((page, i) => {
            const Component = i ? Viewer : Home
            return <Component key={page.key} show={layout.show === page.key} params={page.params} />
          })}
        </Suspense>
      </div>
    </div>
  )
}

export default App

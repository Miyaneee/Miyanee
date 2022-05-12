import { Suspense, lazy } from 'react'
import Nav from '@rsuite/responsive-nav'
import { Reload } from '@rsuite/icons'
import { useSelector, useDispatch } from 'react-redux'
import { selectLayout, showPage, closePage, LayoutState } from '@/store/layout'
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
          {renderComponents(layout.show, layout.pages)}
        </Suspense>
      </div>
    </div>
  )
}

function renderComponents(show: string, pages: LayoutState['pages']) {
  const [hompage, ...appPages] = pages
  const result = []
  result[0] = <Home key={hompage.key} show={show === hompage.key} />
  const { length } = appPages
  let i = 0
  while (i < length) {
    const page = appPages[i]
    result[i + 1] = <Viewer key={page.key} show={show === page.key} params={page.params} />
    i++
  }

  return result
}

export default App

import Nav from '@rsuite/responsive-nav'
import { useSelector, useDispatch } from 'react-redux'
import { selectLayout, showPage, closePage } from '@/store/layout'
import Home from '@/components/Home/Home'
import Plugin from '@/components/Plugin/Plugin'
import '@/App.less'

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
        {layout.pages.map((item, i) => {
          const Component = i ? Plugin : Home
          return <Component key={item.key} show={layout.show === item.key} />
        })}
      </div>
    </div>
  )
}

export default App

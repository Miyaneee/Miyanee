import { Suspense, lazy } from 'react'
import Layout from './layout/Layout'
import Tabs from './components/Tabs/Tabs'
import Home from './features/Home/Home'
import { useDispatch, useSelector } from 'react-redux'
import { selectLayout, handleActiveChange } from './store/layout'
import './App.less'

const Search = lazy(() => import('./features/Search/Search'))
const Viewer = lazy(() => import('./features/Viewer/Viewer'))

function App() {
  const layout = useSelector(selectLayout)
  const dispatch = useDispatch()
  return (
    <Layout>
      <div className="App">
        <Suspense>
          <Tabs
            activeKey={layout.activeKey}
            onActive={activeKey => dispatch(handleActiveChange(activeKey))}
          >
            <Tabs.Item title="首页" activeKey={0}>
              <Home />
            </Tabs.Item>
            {layout.showSearch && (
              <Tabs.Item title="搜索应用" activeKey={1}>
                <Search />
              </Tabs.Item>
            )}
            {layout.viewers.map(({ activeKey, title, props }) => {
              return (
                <Tabs.Item key={activeKey} title={title} activeKey={activeKey}>
                  <Viewer {...props} />
                </Tabs.Item>
              )
            })}
          </Tabs>
        </Suspense>
      </div>
    </Layout>
  )
}

export default App

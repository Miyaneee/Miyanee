import Layout from './layout/Layout'
import Tabs from './components/Tabs/Tabs'
import Home from './features/Home/Home'
import './App.less'

function App() {
  return (
    <Layout>
      <div className="App">
        <Tabs>
          <Tabs.Item title="首页" activeKey={0}>
            <Home />
          </Tabs.Item>
        </Tabs>
      </div>
    </Layout>
  )
}

export default App

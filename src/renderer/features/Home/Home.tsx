import Button from '@/components/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { selectApps, App } from '@/store/apps'
import { selectLayout, createViewer, handleActiveChange } from '@/store/layout'
import './Home.less'

function Home() {
  const apps = useSelector(selectApps)
  const layout = useSelector(selectLayout)
  const dispatch = useDispatch()
  function openApp(app: App) {
    const viewer = layout.viewers.find(viewer => viewer.title === app.name)
    if (viewer) {
      dispatch(handleActiveChange(viewer.activeKey))
      return
    }
    dispatch(
      createViewer({
        title: app.name,
        props: {
          index: app.index,
          preload: app.preload
        }
      })
    )
  }
  return (
    <div className="Home">
      <input type="text" />
      <ul>
        {apps.map(app => (
          <li key={app.name}>
            <div className="content">
              <div className="img-wrapper">
                <img
                  src="https://lf-cdn-tos.bytescm.com/obj/static/xitu_extension/static/github.46c47564.png"
                  alt="img"
                />
              </div>
              <div>
                <h2>{app.name}</h2>
                <p>{app.description}</p>
              </div>
            </div>
            <div className="footer">
              <Button className="primary" onClick={() => openApp(app)}>
                打开
              </Button>
              <Button className="danger">删除</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home

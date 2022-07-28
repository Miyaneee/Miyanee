import { memo } from 'react'
import Button from '@/components/Button/Button'
import { App } from '@shared/types'
import './AppList.less'

interface AppListProps {
  dataSource: App[]
  onOpen: (app: App) => void
  onDelete: (app: App) => void
}

const AppList = memo((props: AppListProps) => {
  const { dataSource, onOpen, onDelete } = props
  return (
    <ul className="AppList">
      {dataSource.map(app => (
        <li key={app.name}>
          <div className="content">
            <div className="img-wrapper">
              <img
                src={
                  app.image ??
                  'https://lf-cdn-tos.bytescm.com/obj/static/xitu_extension/static/github.46c47564.png'
                }
                alt={app.name}
              />
            </div>
            <div>
              <h2>{app.name}</h2>
              <p>{app.description}</p>
            </div>
          </div>
          <div className="footer">
            <Button className="primary" onClick={() => onOpen(app)}>
              打开
            </Button>
            <Button className="danger" onClick={() => onDelete(app)}>
              删除
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
})

AppList.displayName = 'AppList'

export default AppList

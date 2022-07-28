import { useMemo, useState } from 'react'
import { IconPlus } from '@tabler/icons'
import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import AppList from './AppList'
import { useDispatch, useSelector } from 'react-redux'
import { selectApps } from '@/store/apps'
import { selectLayout, createViewer, handleActiveChange, toggleSearch } from '@/store/layout'
import { App } from '@shared/types'
import './Home.less'

function Home() {
  const dispatch = useDispatch()
  const layout = useSelector(selectLayout)
  const apps = useSelector(selectApps)
  const [search, setSearch] = useState('')
  const filteredApps = useMemo(() => apps.filter(app => app.name.includes(search)), [search, apps])

  function dispatchCreateViewer(app: App) {
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
  function handleOpen(app: App) {
    if (app.allowMultiInstances) {
      dispatchCreateViewer(app)
      return
    }
    const viewer = layout.viewers.find(viewer => viewer.title === app.name)
    if (viewer) {
      dispatch(handleActiveChange(viewer.activeKey))
      return
    }
    dispatchCreateViewer(app)
  }
  function handlePlusBtnClick() {
    dispatch(toggleSearch(true))
  }

  return (
    <div className="Home">
      <div className="search-wrapper">
        <Input
          type="text"
          className="search"
          value={search}
          onChange={e => setSearch(e.currentTarget.value)}
          placeholder="搜索..."
        />
        <Button onClick={handlePlusBtnClick}>
          <IconPlus color="#666" />
        </Button>
      </div>
      <AppList dataSource={filteredApps} onOpen={handleOpen} onDelete={() => void 0} />
    </div>
  )
}

export default Home

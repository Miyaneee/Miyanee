import { FC, useState, useEffect, memo } from 'react'
import { InputGroup, Input, Whisper, Popover, Button, toaster, Message } from 'rsuite'
import { Search, CheckRound } from '@rsuite/icons'
import {
  clearApps,
  selectApps,
  getAllApps,
  startDownload,
  handleDownloadFail,
  handledownloadSuccess,
  removeApp,
  AppInfoState
} from '@/store/apps'
import Empty from '@/components/Empty/Empty'
import { selectLayout, showPage } from '@/store/layout'
import { useSelector, useDispatch } from 'react-redux'
import cls from 'classnames'
import { request, downloadApp, getApps, uninstallApp } from '@/utils'
import { NpmObject } from '@shared'
import './Home.less'

const Home: FC<{ show: boolean }> = ({ show }) => {
  const apps = useSelector(selectApps)
  const layout = useSelector(selectLayout)
  const dispatch = useDispatch()
  const [value, setValue] = useState<string>('')
  const [searching, setSearching] = useState<boolean>(false)
  const [objects, setObjects] = useState<NpmObject[]>([])

  useEffect(() => {
    getApps().then(apps => dispatch(getAllApps(apps)))
    return () => {
      dispatch(clearApps())
    }
  }, [dispatch])

  async function search() {
    setSearching(true)
    const [err, data] = await request(
      `https://registry.npmjs.com/-/v1/search?from=0&text=keywords:miyanee-app is:unstable not:unstable ${value}&quality=0.5&popularity=1.0&maintenance=0.1`
    )
    if (err) {
      console.error(err)
      return
    }

    setObjects(data.objects)
  }
  function handleChange(value: string) {
    if (!value) {
      setSearching(false)
    }
    setValue(value)
  }
  function openApp(app: AppInfoState) {
    const opened = layout.pages.find(page => page.label === app.name)
    if (opened) {
      dispatch(showPage(opened.key))
    } else {
      dispatch(
        showPage({
          label: app.name,
          params: { ...app }
        })
      )
    }
  }
  async function uninstall(app: AppInfoState) {
    await uninstallApp(app)
    dispatch(removeApp(app.packageName))
    toaster.push(
      <Message type="success" showIcon>
        App uninstalled
      </Message>
    )
  }
  return (
    <div className={cls('Home', { hide: !show })}>
      <InputGroup inside className="search">
        <Input value={value} onChange={handleChange} placeholder="Search apps" />
        <InputGroup.Button onClick={search}>
          <Search />
        </InputGroup.Button>
      </InputGroup>
      {!searching && <AppList apps={apps} onOpen={openApp} onUninstall={uninstall} />}
      {searching && (
        <>
          <div style={{ marginBottom: 10 }}>
            <Button appearance="primary" onClick={() => setSearching(false)}>
              Back
            </Button>
          </div>
          <ResultList objects={objects} onOpen={openApp} />
        </>
      )}
    </div>
  )
}

type AppListProps = {
  apps: AppInfoState[]
  onOpen(app: AppInfoState): void
  onUninstall(app: AppInfoState): void
}

const AppList = memo<AppListProps>(function AppList({ apps, onOpen, onUninstall }) {
  if (!apps.length) {
    return <Empty>No app yet</Empty>
  }
  return (
    <ul className="apps">
      {apps.map((app, i) => {
        const { name, isOffical, description, author, keywords = [], version } = app
        return (
          <li key={i}>
            <div className="title">
              <span>{name}</span>
              {isOffical && <OfficalMark />}
            </div>
            <div className="desc">{description}</div>
            <div className="author">author: {author}</div>
            <div className="meta">
              {keywords.map(keyword => (
                <div key={keyword} className="tag">
                  {keyword}
                </div>
              ))}
            </div>
            <div className="version">{version}</div>
            <div className="operation">
              <Button
                appearance="primary"
                color="green"
                size="sm"
                style={{ marginRight: 8 }}
                onClick={() => onOpen(app)}
              >
                Open
              </Button>
              <Button appearance="primary" color="red" size="sm" onClick={() => onUninstall(app)}>
                Uninstall
              </Button>
            </div>
          </li>
        )
      })}
    </ul>
  )
})

type ResultListProps = {
  objects: NpmObject[]
  onOpen(app: AppInfoState): void
}

const ResultList = memo<ResultListProps>(function ResultList({ objects, onOpen }) {
  const apps = useSelector(selectApps)
  const dispatch = useDispatch()

  if (!objects.length) {
    return <Empty>Apps not found</Empty>
  }

  async function download(object: NpmObject) {
    const packageName = object.package.name
    dispatch(
      startDownload({
        packageName,
        ready: false,
        downloading: true
      })
    )
    const data = await downloadApp(object)
    if (!data) {
      dispatch(handleDownloadFail(packageName))
      toaster.push(
        <Message type="error" showIcon>
          Download fail
        </Message>
      )
      return
    }
    dispatch(handledownloadSuccess(data))
    toaster.push(
      <Message type="success" showIcon>
        Download success
      </Message>
    )
  }
  return (
    <ul className="results">
      {objects.map((obj, i) => {
        const { name, description, scope, version, keywords = [] } = obj.package
        const isOffical = 'miyaneee' === scope
        const app = apps.find(app => app.packageName === name)
        const shouldDownload = !app
        const downloading = app && app.downloading
        const available = app && app.ready
        const shouldUpdate = available && version !== app.version
        return (
          <li key={i}>
            <div className="title">
              <span>{name}</span>
              {isOffical && <OfficalMark />}
            </div>
            <div className="desc">{description}</div>
            <div className="meta">
              {keywords.map(keyword => (
                <div key={keyword} className="tag">
                  {keyword}
                </div>
              ))}
            </div>
            <div className="version">{version}</div>
            <div className="operation">
              {shouldUpdate && !downloading && (
                <Button
                  size="sm"
                  style={{ marginRight: 8 }}
                  appearance="primary"
                  onClick={() => download(obj)}
                >
                  Update
                </Button>
              )}
              {shouldDownload && (
                <Button size="sm" appearance="primary" onClick={() => download(obj)}>
                  Download
                </Button>
              )}
              {downloading && (
                <Button size="sm" appearance="primary" disabled>
                  Downloading...
                </Button>
              )}
              {available && !downloading && (
                <Button size="sm" appearance="primary" color="green" onClick={() => onOpen(app)}>
                  Open
                </Button>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
})

function OfficalMark() {
  return (
    <Whisper trigger="hover" speaker={<Popover>Offical App</Popover>}>
      <CheckRound fill="#4cd137" />
    </Whisper>
  )
}

export default memo(Home)

import { useState, useEffect, memo } from 'react'
import { InputGroup, Input, Whisper, Popover, Button } from 'rsuite'
import { Search, CheckRound } from '@rsuite/icons'
import {
  clearApps,
  selectApps,
  getAllApps,
  startDownload,
  handleDownloadFail,
  handledownloadSuccess
} from '@/store/apps'
import { selectLayout, showPage } from '@/store/layout'
import { useSelector, useDispatch } from 'react-redux'
import cls from 'classnames'
import { request, downloadApp, getApps } from '@/utils'
import './Home.less'

function Home({ show }) {
  const apps = useSelector(selectApps)
  const layout = useSelector(selectLayout)
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState([])

  useEffect(() => {
    getApps().then(apps => dispatch(getAllApps(apps)))
    return () => dispatch(clearApps())
  }, [dispatch])

  async function search() {
    setSearching(true)
    const [err, res] = await request(
      `https://registry.npmjs.com/-/v1/search?from=0&text=keywords:miyanee-app is:unstable not:unstable ${value}&quality=0.5&popularity=1.0&maintenance=0.1`
    )
    if (err) {
      console.log(err)
      return
    }
    setResults(res.data.objects)
  }
  function handleChange(value) {
    if (!value) {
      setSearching(false)
    }
    setValue(value)
  }
  function openApp(app) {
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
  return (
    <div className={cls('Home', { hide: !show })}>
      <InputGroup inside className="search">
        <Input value={value} onChange={handleChange} />
        <InputGroup.Button onClick={search}>
          <Search />
        </InputGroup.Button>
      </InputGroup>
      {!searching && <AppList apps={apps} onClick={openApp} />}
      {searching && <ResultList results={results} onOpen={openApp} />}
    </div>
  )
}

const AppList = memo(({ apps, onClick }) => {
  return (
    <ul className="apps">
      {apps.map((app, i) => {
        const { name, isOffical, description, author, keywords = [], version } = app
        return (
          <li key={i} onClick={() => onClick(app)}>
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
          </li>
        )
      })}
    </ul>
  )
})

const ResultList = memo(({ results, onOpen }) => {
  const apps = useSelector(selectApps)
  const dispatch = useDispatch()
  async function download(object) {
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
      return
    }
    dispatch(handledownloadSuccess(data))
  }
  return (
    <ul className="results">
      {results.map((result, i) => {
        const { name, description, scope, version, keywords = [] } = result.package
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
                  onClick={() => download(result)}
                >
                  更新
                </Button>
              )}
              {shouldDownload && (
                <Button size="sm" appearance="primary" onClick={() => download(result)}>
                  下载
                </Button>
              )}
              {downloading && (
                <Button size="sm" appearance="primary" disabled>
                  下载中...
                </Button>
              )}
              {available && !downloading && (
                <Button size="sm" appearance="primary" color="green" onClick={() => onOpen(app)}>
                  打开
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
    <Whisper trigger="hover" speaker={<Popover>Offical Plugin</Popover>}>
      <CheckRound color="#4cd137" />
    </Whisper>
  )
}

export default memo(Home)

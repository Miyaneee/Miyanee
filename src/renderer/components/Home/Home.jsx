import { useState, memo } from 'react'
import { InputGroup, Input, Whisper, Popover, Button } from 'rsuite'
import { Search, CheckRound } from '@rsuite/icons'
import { selectApps, startDownload, handleDownloadFail, handledownloadSuccess } from '@/store/apps'
import { selectLayout, showPage } from '@/store/layout'
import { useSelector, useDispatch } from 'react-redux'
import cls from 'classnames'
import { request, downloadApp } from '@/utils'
import './Home.less'

function Home({ show }) {
  const apps = useSelector(selectApps)
  const layout = useSelector(selectLayout)
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState([])

  async function search() {
    setSearching(true)
    const [err, res] = await request(
      `https://registry.npmjs.com/-/v1/search?from=0&text=keywords:miyanee-app is:unstable not:unstable ${value}&quality=0.5&popularity=1.0&maintenance=0.1`
    )
    if (err) {
      console.log(err)
      return
    }
    console.log(res.data)
    setResults(res.data.objects)
  }
  function handleChange(value) {
    if (!value) {
      setSearching(false)
    }
    setValue(value)
  }
  function openApp(plugin) {
    const opened = layout.pages.find(page => page.label === plugin.name)
    if (opened) {
      dispatch(showPage(opened.label))
    } else {
      dispatch(
        showPage({
          label: plugin.name,
          params: { ...plugin }
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
      {apps.map((app, i) => (
        <li key={i} onClick={() => onClick(app)}>
          <div className="title">
            <span>{app.name}</span>
            {app.isOffical && <OfficalMark />}
          </div>
          <div className="desc">{app.description}</div>
        </li>
      ))}
    </ul>
  )
})

const ResultList = memo(({ results, onOpen }) => {
  const apps = useSelector(selectApps)
  console.log(apps)
  const dispatch = useDispatch()
  async function download(object) {
    const packageName = object.package.name
    dispatch(
      startDownload({
        packageName,
        ready: false
      })
    )
    const data = await downloadApp(object)
    console.log('data', data)
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
        const downloading = app && !app.ready
        const available = app && app.ready
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
              {shouldDownload && (
                <Button appearance="primary" onClick={() => download(result)}>
                  下载
                </Button>
              )}
              {downloading && (
                <Button appearance="primary" disabled>
                  下载中...
                </Button>
              )}
              {available && (
                <Button appearance="primary" color="green" onClick={() => onOpen(app)}>
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

import { useState, memo } from 'react'
import { InputGroup, Input, Button } from 'rsuite'
import { Search } from '@rsuite/icons'
import { selectPlugins } from '@/store/plugins'
import { selectLayout, showPage } from '@/store/layout'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import './Home.less'

function Home({ show }) {
  const plugins = useSelector(selectPlugins)
  const layout = useSelector(selectLayout)
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState([])

  async function search() {
    setSearching(true)
    const { data } = await axios.get(
      `https://registry.npmjs.com/-/v1/search?from=0&text=keywords:miyanee-app is:unstable not:unstable ${value}&quality=0.5&popularity=1.0&maintenance=0.1`
    )
    setResults(data.objects)
  }
  function handleChange(value) {
    if (!value) {
      setSearching(false)
    }
    setValue(value)
  }
  function openPlugin(plugin) {
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
    <div
      className="Home"
      style={{
        display: show ? '' : 'none'
      }}
    >
      <InputGroup inside className="search">
        <Input value={value} onChange={handleChange} />
        <InputGroup.Button onClick={search}>
          <Search />
        </InputGroup.Button>
      </InputGroup>

      {!searching && (
        <ul className="plugins">
          {plugins.map(plugin => (
            <li key={plugin.name}>
              <Button onClick={() => openPlugin(plugin)}>{plugin.name}</Button>
            </li>
          ))}
        </ul>
      )}

      {searching && (
        <ul className="results">
          {results.map((result, i) => (
            <li key={i}>
              <span>{JSON.stringify(result)}</span>
              <p>{getDownloadUrl(result)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function getDownloadUrl(object) {
  const { name, scope, version } = object.package
  const withScope = scope !== 'unscoped'
  const scopeStr = withScope ? `@${scope}/` : ''
  const nameStr = withScope ? name.split('/')[1] : name
  return `https://registry.npmjs.org/${scopeStr}${nameStr}/-/${nameStr}-${version}.tgz`
}

export default memo(Home)

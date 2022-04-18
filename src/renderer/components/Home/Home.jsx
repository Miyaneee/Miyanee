import { useState, memo } from 'react'
import { InputGroup, Input, Button } from 'rsuite'
import { Search } from '@rsuite/icons'
import { selectPlugins } from '@/store/plugins'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './Home.less'

function Home({ show }) {
  const plugins = useSelector(selectPlugins)
  const [value, setValue] = useState('')
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState([])

  async function search() {
    setSearching(true)
    const { data } = await axios.get(
      `https://registry.npmjs.com/-/v1/search?from=0&text=keywords:vite is:unstable not:unstable ${value}&quality=0.5&popularity=1.0&maintenance=0.1`
    )
    setResults(data.objects)
  }
  function handleChange(value) {
    if (!value) {
      setSearching(false)
    }
    setValue(value)
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
              <Button>{plugin.name}</Button>
            </li>
          ))}
        </ul>
      )}

      {searching && (
        <ul className="results">
          {results.map((result, i) => (
            <li key={i}>{JSON.stringify(result)}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default memo(Home)

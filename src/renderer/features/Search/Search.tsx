import { useState, useEffect, useCallback, FormEvent } from 'react'
import Input from '@/components/Input/Input'
import Button from '@/components/Button/Button'
import SearchList from './SearchList'
import request from '@/utils/request'
import { NpmObject, NpmSearchResult } from '@shared/types'
import './Search.less'

function Search() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<NpmObject[]>([])

  const fetchApps = useCallback(async (value = '') => {
    const [err, res] = await request<NpmSearchResult>({
      url: `https://registry.npmjs.com/-/v1/search?from=0&text=keywords:miyanee-app is:unstable not:unstable ${value}&quality=0.5&popularity=1.0&maintenance=0.1`
    })
    if (err) {
      console.error(err)
      return
    }
    console.log(res)
    setResults(res.objects)
  }, [])
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    fetchApps()
  }

  useEffect(() => {
    fetchApps()
  }, [fetchApps])

  return (
    <div className="Search">
      <form className="search-wrapper" onSubmit={handleSubmit}>
        <Input
          type="text"
          className="search"
          value={search}
          onChange={e => setSearch(e.currentTarget.value)}
          placeholder="搜索..."
        />
        <Button className="primary" type="submit">
          搜索
        </Button>
      </form>
      <SearchList dataSource={results} />
    </div>
  )
}
export default Search

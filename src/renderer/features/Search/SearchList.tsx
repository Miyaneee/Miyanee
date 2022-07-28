import Button from '@/components/Button/Button'
import { NpmObject } from '@shared/types'
import './SearchList.less'

interface SearchListProps {
  dataSource: NpmObject[]
}

function SearchList(props: SearchListProps) {
  const { dataSource } = props
  return (
    <ul className="SearchList">
      {dataSource.map((data, i) => (
        <li key={i}>
          <h2>
            {data.package.name}@{data.package.version}
          </h2>
          <p>{data.package.description}</p>
          <div className="tags">
            {data.package.keywords?.map((keyword, i) =>
              keyword === 'miyanee-app' ? null : <div key={i}>{keyword}</div>
            )}
          </div>
          <footer>
            <Button>下载</Button>
          </footer>
        </li>
      ))}
    </ul>
  )
}

export default SearchList

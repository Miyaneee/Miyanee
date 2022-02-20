import { Button } from 'rsuite'
import { useNavigate } from 'react-router-dom'
import './Error.less'

function Error() {
  const navigate = useNavigate()
  return (
    <div id="ErrorPage">
      <div>
        <h1>404 Not Found</h1>
        <h3>Something went wrong, the page is not here.</h3>
        <Button appearance="primary" size="md" onClick={() => navigate('/', { replace: true })}>
          Back Home
        </Button>
      </div>
    </div>
  )
}

export default Error

import { Suspense, lazy } from 'react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { Loader } from 'rsuite'

const Home = lazy(() => import('@/pages/Home/Home'))
const Error = lazy(() => import('@/pages/Error/Error'))

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </MemoryRouter>
    </Suspense>
  )
}

export default App

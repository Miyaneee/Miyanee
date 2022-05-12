import { FC } from 'react'
import empty from '@/assets/empty.svg'
import './Empty.less'

const Empty: FC = ({ children }) => {
  return (
    <div className="Empty">
      <img src={empty} alt="empty" draggable="false" />
      <p>{children}</p>
    </div>
  )
}

export default Empty

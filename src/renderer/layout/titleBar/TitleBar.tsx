import { useEffect } from 'react'
import Group from '@/components/Group'
import Minimize from '@/components/Icons/Minimize'
import Maximize from '@/components/Icons/Maximize'
import Restore from '@/components/Icons/Restore'
import Close from '@/components/Icons/Close'
import useBoolean from '@/hooks/useBoolean'
import { ipcOff, ipcOn, ipcSend, ipcSendSync } from '@/utils/preload'
import './TitleBar.less'
import icon from '@/favicon.ico?url'

function TitleBar() {
  const [isMaximize, toggleIsMaximize] = useBoolean(ipcSendSync('IS_WINDOW_MAXIMIZE'))
  useEffect(() => {
    ipcOn('WINDOW_MAXIMIZE', () => toggleIsMaximize(true))
    ipcOn('WINDOW_UNMAXIMIZE', () => toggleIsMaximize(false))
    return () => {
      ipcOff('WINDOW_MAXIMIZE')
      ipcOff('WINDOW_UNMAXIMIZE')
    }
  }, [])
  return (
    <Group className="TitleBar" justifyContent="space-between">
      <Group>
        <img className="logo" src={icon} alt="Miyanee" />
        <h1>Miyanee</h1>
      </Group>
      <div className="traffic">
        <button onClick={() => ipcSend('WINDOW_MINIMIZE')}>
          <Minimize />
        </button>
        <button onClick={() => ipcSend(isMaximize ? 'WINDOW_UNMAXIMIZE' : 'WINDOW_MAXIMIZE')}>
          {isMaximize ? <Restore /> : <Maximize />}
        </button>
        <button className="close" onClick={() => ipcSend('WINDOW_CLOSE')}>
          <Close />
        </button>
      </div>
    </Group>
  )
}

export default TitleBar

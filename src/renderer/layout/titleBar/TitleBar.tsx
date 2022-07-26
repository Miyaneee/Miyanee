import Group from '@/components/Group'
import Minimize from '@/components/Icons/Minimize'
import Maximize from '@/components/Icons/Maximize'
// import Restore from '@/components/Icons/Restore'
import Close from '@/components/Icons/Close'
import icon from '@/favicon.ico?url'
import './TitleBar.less'

function TitleBar() {
  return (
    <Group className="TitleBar" justifyContent="space-between">
      <Group>
        <img className="logo" src={icon} alt="Miyanee" />
        <h1>Miyanee</h1>
      </Group>
      <div className="traffic">
        <button>
          <Minimize />
        </button>
        <button>
          <Maximize />
        </button>
        <button className="close">
          <Close />
        </button>
      </div>
    </Group>
  )
}

export default TitleBar

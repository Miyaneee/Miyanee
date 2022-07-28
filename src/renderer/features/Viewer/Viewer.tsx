import './Viewer.less'

export interface ViewerProps {
  index: string
  preload?: string
}

function Viewer(props: ViewerProps) {
  const { index, preload } = props
  return <webview className="Viewer" src={index} preload={preload} />
}

export default Viewer

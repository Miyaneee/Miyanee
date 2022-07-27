export interface ViewerProps {
  index: string
  preload?: string
}

function Viewer(props: ViewerProps) {
  const { index, preload } = props
  return <webview style={{ height: '100%' }} src={index} preload={preload} />
}

export default Viewer

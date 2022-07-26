import { SVGProps } from 'react'

function Minimize(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      {...props}
    >
      <path d="M74.752 480.256h874.496c21.504 0 31.744 10.752 32.256 32.256 0 21.504-10.752 32.256-32.256 32.256H74.752c-21.504 0-32.256-10.752-32.256-32.256 0-22.016 10.752-32.256 32.256-32.256z" />
    </svg>
  )
}
export default Minimize

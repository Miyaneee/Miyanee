import { SVGProps } from 'react'

export default function Maximize(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      {...props}
    >
      <path d="M853.504 170.496v682.496H170.496V170.496h683.008m4.096-64h-691.2c-32.768 0-59.392 26.624-59.392 59.392v691.712c0 32.768 26.624 59.392 59.392 59.392h691.712c32.768 0 59.392-26.624 59.392-59.392v-691.2c0-33.28-26.624-59.904-59.904-59.904 0.512 0 0 0 0 0z" />
    </svg>
  )
}

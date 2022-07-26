import { forwardRef, DetailedHTMLProps, ButtonHTMLAttributes } from 'react'
import cx from 'clsx'
import './Button.less'

type ReactButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>
interface ButtonProps extends Omit<ReactButtonProps, 'ref'> {
  classNames?: Record<string, any>
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, className, classNames, ...others } = props
  return (
    <button className={cx('Button', className, classNames)} ref={ref} {...others}>
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button

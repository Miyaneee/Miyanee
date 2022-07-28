import { forwardRef, DetailedHTMLProps, InputHTMLAttributes } from 'react'
import cx from 'clsx'
import './Input.less'

type ReactInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
interface InputProps extends Omit<ReactInputProps, 'ref'> {
  classNames?: Record<string, any>
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, classNames, ...others } = props
  return <input className={cx('Input', className, classNames)} ref={ref} {...others} />
})

Input.displayName = 'Input'

export default Input

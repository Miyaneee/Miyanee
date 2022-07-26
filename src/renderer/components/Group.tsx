import {
  forwardRef,
  CSSProperties,
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithoutRef
} from 'react'

interface GroupProps
  extends PropsWithoutRef<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> {
  justifyContent?: CSSProperties['justifyContent']
  alignItems?: CSSProperties['alignItems']
  flexWrap?: CSSProperties['flexWrap']
  flexDirection?: CSSProperties['flexDirection']
}

const Group = forwardRef<HTMLDivElement, GroupProps>((props, ref) => {
  const { children, style, justifyContent, alignItems, flexWrap, flexDirection, ...others } = props
  return (
    <div
      ref={ref}
      style={{
        ...style,
        display: 'flex',
        justifyContent,
        alignItems,
        flexWrap,
        flexDirection
      }}
      {...others}
    >
      {children}
    </div>
  )
})

Group.displayName = 'Group'

export default Group

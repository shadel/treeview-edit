import React, { RefObject } from 'react'
import classNames from 'classnames'

export const Button = React.forwardRef(function ButtonRef(
  {
    isPrimary = false,
    children,
    onClick,
  }: React.PropsWithChildren<{
    isPrimary?: boolean
    onClick?: React.MouseEventHandler<HTMLAnchorElement>
  }>,
  ref: RefObject<HTMLAnchorElement>
) {
  return (
    <a
      ref={ref}
      href="#"
      className={classNames(
        'w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md  md:py-4 md:text-lg md:px-10',
        {
          'text-white bg-indigo-600 hover:bg-indigo-700': isPrimary,
          'text-indigo-700 bg-indigo-100 hover:bg-indigo-200': !isPrimary,
        }
      )}
      onClick={onClick}
    >
      {children}
    </a>
  )
}) as React.ComponentType<
  React.PropsWithChildren<{
    isPrimary?: boolean
    onClick?: React.MouseEventHandler<HTMLAnchorElement>
  }> & { ref?: RefObject<HTMLAnchorElement> }
>

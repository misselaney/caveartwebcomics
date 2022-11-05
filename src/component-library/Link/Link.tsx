import React from 'react'
import classNames from 'classnames'
import '../design/Style.css'
import './Link.css'

export interface LinkProps {
  id: string
  /**
   * Children for the link
  */
  children: React.ReactNode
  /**
   * Pass the `href` attribute for the <a> element
   */
  href: string
  /**
   * Optional additional styling
  * */
  classes?: string
  inline?: boolean
  /**
   * Pass the <a> element target attribute
  * */
  target?: '_blank' | '_self' | '_parent' | '_top' | 'framename'
  disabled?: boolean
  /**
   * custom on click event function
  * */
  onClick?: (...params: any) => any
}

const Link = ({
  id,
  children = 'Link',
  href = '#',
  target = '_self',
  classes = '',
  disabled,
  inline,
  onClick,
  ...props
}:LinkProps) => {
  return(
    <a
      href={href}
      target={target}
      className={`link ${classes} ${classNames({
        'Inline': !!inline
      })}`.trim()}
      onClick={(e) => {
        if (!disabled && onClick) {
          onClick()
        }
      }}
    >
      {children}
    </a>
  )
}

export default Link
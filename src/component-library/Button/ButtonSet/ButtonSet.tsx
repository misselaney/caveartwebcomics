import React from 'react'
import './ButtonSet.css'

export interface ButtonSetProps {
  children: React.ReactNode
  classes?: string
}

const ButtonSet = ({
  children,
  classes = '',
  ...props}: ButtonSetProps) => {
  return (
    <div
      className={`buttonset ${classes}`.trim()}
    >
      {children}
    </div>
  )
}

export default ButtonSet
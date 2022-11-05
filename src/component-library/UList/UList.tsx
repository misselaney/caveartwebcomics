import React from 'react'
import classNames from 'classnames'
import '../design/Style.css'
import './UList.css'

export interface UListProps {
  id: string
  /**
   * Children for the list
  */
  children: React.ReactNode
  /** Optional additional styling
  * */
  classes?: string
}

const UList = ({
  id,
  children,
  classes = '',
  ...props}: UListProps) => {
  return(
    <ul className={`unordered-list ${classes}`.trim()}>
      {children}
    </ul>
  )
}

export default UList
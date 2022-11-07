import React from 'react'
import classNames from 'classnames'
import '../design/Style.css'
// import './Comment.css'

export interface CommentProps {
  id: string
  /**
   * optional additional styling
  */
  classes?: string
  tabIndex?: number
}

const Comment = ({
  id,
  classes = '',
  tabIndex,
  ...props}: CommentProps) => {

  return (
    <article className="userpost" role="article" data-testid="comment">
      <div className="userpost_avatar">
        <img src="#" />
      </div>

      <div className="userpost_content">
        <div className="userpost_user">
          <a href="#">Jimbo Jones</a>
        </div>
        Handgloves
      </div>
    </article>
  )
}

export default Comment
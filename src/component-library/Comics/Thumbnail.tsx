import React from 'react'
import './Thumbnail.css'

function Thumbnail() {

  return (
    <div className="thumbnail">
      <div className="thumbnail_overlay" />
      <img src="/public/img/brand/cave.png" className="thumbnail_image" />
    </div>
  )
}

export default Thumbnail;
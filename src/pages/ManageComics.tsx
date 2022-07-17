import React from 'react'

function ManageComics() {
  return (
    <>
      <ul className="comiclist">
        <li className="comiclist__entry">
          <div className="comiclist__thumbnail">Img</div>
          <div className="comiclist__details">
            <span className="comiclist__title">Comic Name</span>
            <span className="comiclist__description">Comic description</span>
          </div>
        </li>
      </ul>
      <a href='new'>
        Create A Comic
      </a>
    </>
  )
}

export default ManageComics;
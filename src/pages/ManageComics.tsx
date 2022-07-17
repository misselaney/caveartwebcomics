import React, { useState, useEffect } from 'react'
import axios from 'axios'

function ManageComics() {
  const [comics, setComics] = useState<object[]>([])

  useEffect(() => {
    let id = 0
    const tokens = localStorage.getItem('tokens')
    if (typeof tokens === 'string') {
      id = JSON.parse(tokens).caveartwebcomicsId
      axios.get(`/api/comic/author/${id}`)
        .then((res) => {
          if (Array.isArray(res.data)) {
            setComics(res.data)
          }
        })
    }
  })

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
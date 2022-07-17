import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface Comic {
  id: number,
  name: string,
  subdomain: string,
  author: number,
  createdAt?: string,
  private?: boolean,
  unlisted?: boolean,
  description?: string
}

function ManageComics() {
  const [comics, setComics] = useState<Comic[]>([])

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
  },[])

  const renderComicList = function(list: Comic[]) {
    if (list.length > 0) {
      console.log(list)
      return (
        <ul>
          {list.map((comic, idx) => {
            return (
              <li key={idx} className="comiclist__entry">
                <a href={`${comic.subdomain}`}>
                  <div className="comiclist__thumbnail">Img</div>
                  <div className="comiclist__details">
                    <span className="comiclist__title">{comic.name}</span>
                    <span className="comiclist__description">{comic.description || 'A webcomic!'}</span>
                  </div>
                </a>
              </li>
            )}
          )}
        </ul>
      )
    }
    return <li>low</li>
  }

  return (
    <>
      {renderComicList(comics)}
      <a href='new'>
        Create A Comic
      </a>
    </>
  )
}

export default ManageComics;
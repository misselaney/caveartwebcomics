import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Main() {

  interface Comic {
    id: number,
    name: string,
    description: string,
    release_on: string,
    subdomain: string,
    thumbnail: string
  }

  useEffect(() => {
    axios.get(`/api/comic/recent`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          console.log(res.data)
          setComics(res.data)
        }
      })
  },[])

  const [comics, setComics] = useState<Comic[]>([])

  return (
    <div>
      {comics.map((comic, idx) => {
        return (
          <a href={`comic/${comic.subdomain}/read`} className="comicTiles" key={idx}>
            <img className="comicTiles__thumbnail" src={comic.thumbnail} />
            <span className="comicTiles__title">{comic.name}</span>
          </a>
        )
      })}
    </div>
  )
}

export default Main;
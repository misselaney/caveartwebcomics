import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from '../component-library/Link'
import Thumbnail from '../component-library/Comics/Thumbnail'

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
    axios.get(`/api/comic/mine`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setComics(res.data)
        }
      })
  },[])

  const renderComicList = function(list: Comic[]) {
    if (list.length > 0) {
      return (
        <ul>
          {list.map((comic, idx) => {
            return (
              <li key={idx} className="comiclist_entry">
                <Thumbnail />
                <div className="comiclist_details">
                  <span className="comiclist_title">{comic.name}</span>
                  <span className="comiclist_description">{comic.description || 'A webcomic!'}</span>
                  <Link id={`comiclist_link_add_${idx}`} href={`/manage/upload/${comic.subdomain}`}>Add page</Link>
                  <Link id={`comiclist_link_edit_${idx}`} href="#">Edit</Link>
                  <Link id={`comiclist_link_read__${idx}`} href={`/comic/${comic.subdomain}/read`}>Read</Link>
                </div>
              </li>
            )}
          )}
        </ul>
      )
    }
    return (
      <div>
        You don&rsquo;t have any comics yet!
      </div>
    )
  }

  return (
    <>
      {renderComicList(comics)}
      <Link id="create_comic" href='new'>
        Create A Comic
      </Link>
    </>
  )
}

export default ManageComics;
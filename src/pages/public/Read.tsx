import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Icon from '../../component-library/Icon'
import ComicPageSelect from '../../component-library/Form/Select'
import axios from 'axios'

function Read() {

  const [image, setImage] = useState<string>('')
  const [lastPage, setLastPage] = useState<number>(0)
  const [comicPages, setComicPages] = useState<{value: string, label: string}[]>([])
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  const { comic } = useParams()
  const { page } = useParams()
  let currPage = 1
  if (page !== undefined) {
    currPage = parseInt(page)
  }
  const prevPage = currPage -1
  const nextPage = currPage +1

  useEffect(() => {
    axios({
      method: 'get',
      url: `/api/comic/page/${comic}/${currPage}`,
    })
      .then((res) => {
        if (res.data?.img) {
          setImage(res.data.img)
        }
      })
      .catch((err) => {
        console.error(err)
      })

    axios({
      method: 'get',
      url: `api/comic/pagecount/${comic}`
    })
      .then((res) => {
        if (typeof res.data?.count === 'number') {
          console.log("go thru pages")
          setLastPage(res.data.count)
          const newPages = [] as {value: string, label: string}[]
          for (let i = 1; i <= res.data.count; i++) {
            newPages.push({ value: (i).toString(), label: `Page ${i}` });
          }
          setComicPages(newPages)
          console.log(comicPages)
          setIsLastPage(nextPage > res.data.count)
        }
      })
      .catch((err) => {
        console.error(err)
      })

  },[])
  
  return (
    <div className="comic-page">
      <a
        href={isLastPage ? '#' : `/comic/${comic}/read/${nextPage}`}
      >
        <img className="comic-page_image" src={`/${image}`} />
      </a>

      <div className="comic-page_navigation">
        <a
          className={ prevPage === 0 ? 'Disabled' : '' }
          href={prevPage === 0 ? '#' : `/comic/${comic}/read/1` }
          aria-label="First page"
        >
          <Icon
            disabled={prevPage === 0}
            width="32"
            height="32"
            name="doubleLeft"
            title="First page"
            id="icon_first-page"
          />
        </a>
        <a
          className={ prevPage === 0 ? 'Disabled' : '' }
          href={prevPage === 0 ? '#' : `/comic/${comic}/read/${prevPage}` }
          aria-label="Previous page"
        >
          <Icon
            disabled={prevPage === 0}
            width="32"
            height="32"
            name="caratLeft"
            title="Previous page"
            id="icon_prev-page"
          />
        </a>

        <ComicPageSelect
          id="comic-dropdown"
          current={currPage}
          options={comicPages}
        />

        <a
          className= { isLastPage ? 'Disabled' : ''}
          href={`/comic/${comic}/read/${nextPage}`}
          aria-label="Next page"
        >
          <Icon
            disabled={isLastPage}
            width="32"
            height="32"
            name="caratRight"
            title="Next page"
            id="icon_next-page"
          />
        </a>
        <a
          className={ isLastPage ? 'Disabled' : ''}
          href={`/comic/${comic}/read/${lastPage}`}
          aria-label="Last page"
        >
          <Icon
            disabled={isLastPage}
            width="32"
            height="32"
            name="doubleRight"
            title="Last page"
            id="icon_last-page"
          />
        </a>
      </div>
    </div>
  )
}

export default Read;
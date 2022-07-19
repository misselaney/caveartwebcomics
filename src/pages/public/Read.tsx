import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Read() {

  const [image, setImage] = useState<string>('')
  const [lastPage, setLastPage] = useState<number>(0)
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
        if (typeof res.data === 'number') {
          setLastPage(res.data)
          setIsLastPage(nextPage > res.data)
        }
      })
      .catch((err) => {
        console.error(err)
      })

  },[])
  
  const goToFirst = function () {
    console.log('ook ook')
  }

  const goToBack = function () {
    console.log('ook ook')
  }

  const goToNext = function () {
    console.log('ook ook')
  }

  const goToLast = function () {
    console.log('ook ook')
  }

  return (
    <div className="comic-page">
      <img className="comic-page__image" src={`/img/${image}`} />

      <div className="comic-page__navigation">
        <a
          className={ prevPage < 0 ? 'Disabled' : '' }
          href={prevPage === 0 ? '#' : `/comic/${comic}/read/1` }
        >
          First
        </a>
        <a
          className={ prevPage < 0 ? 'Disabled' : '' }
          href={prevPage === 0 ? '#' : `/comic/${comic}/read/${prevPage}` }
        >
          Previous
        </a>
        <a
          className= { isLastPage ? 'Disabled' : ''}
          href={`/comic/${comic}/read/${nextPage}`}
        >
          Next
        </a>
        <a
          className= { isLastPage ? 'Disabled' : ''}
          href={`/comic/${comic}/read/${lastPage}`}
        >
          Latest
        </a>
      </div>
    </div>
  )
}

export default Read;
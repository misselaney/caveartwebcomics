import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Read() {

  const [image, setImage] = useState<string>('')
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  const { comic } = useParams()
  const { page } = useParams()
  
  useEffect(() => {
    axios({
      method: 'get',
      url: `/api/comic/page/${comic}/${page}`,
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
        console.log(res.data)
      })
      .catch((err) => {
        console.error(err)
      })

  },[])
  
  let prevPage = 0
  let nextPage = 1

  if (page) {
    prevPage = parseInt(page) - 1
    nextPage = parseInt(page) + 1
  }

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
          href={prevPage > 0 ? `/comic/${comic}/read/0` : '#' }
        >
          First
        </a>
        <a
          className={ prevPage < 0 ? 'Disabled' : '' }
          href={prevPage > 0 ? `/comic/${comic}/read/${prevPage}` : '#' }
        >
          Previous
        </a>
        <a
          href={`/comic/${comic}/read/${nextPage}`}
        >
          Next
        </a>
        <a>Latest</a>
      </div>
    </div>
  )
}

export default Read;
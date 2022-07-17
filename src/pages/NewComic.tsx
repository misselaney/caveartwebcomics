import React, { useState, useEffect } from 'react'
import ComicTag from '../components/ComicTag'
import { Button, TextInput } from '@marissaconner/sousanne-component-library'
import axios from 'axios'

interface Genre {
  children: object[],
  description: string,
  id: number,
  lvl: number,
  name: string,
  parent_id: number
}

interface Style {
  id: number,
  name: string,
  description: string
}

const defaultGenres = {
  children: [],
  description: '',
  id: 0,
  lvl: 0,
  name: 'Loading',
  parent_id: 0
}

const defaultStyles = { id: 0, name: 'Loading', description: '' }

const defaultPicks = {}

const visibilities = ['Public', 'Unlisted', 'Private']

function NewComic() {
  const [genres, setGenres] = useState<Genre[]>([defaultGenres])
  const [styles, setStyles] = useState<Style[]>([defaultStyles])
  const [name, setName] = useState<string>('')
  const [subdomain, setSubdomain] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [selectedGenres, setSelectedGenres] = useState<{[key: string]: string}>(defaultPicks)
  const [selectedStyles, setSelectedStyles] = useState<{[key: string]: string}>(defaultPicks)
  const [visibility, setVisibility] = useState<string>('')
  const [submissionError, setSubmissionError] = useState<boolean>(false)


  const onNameChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
  }

  const onSubdomainChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    setSubdomain(e.target.value)
  }

  const onDescriptionChange = function (e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(e.target.value)
  }

  const onVisibilityChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    setVisibility(e.target.value)
  }

  const toggleGenre = function (pick: {id: number, name: string}) {
    const newGenres = {...selectedGenres}
    if (newGenres[pick.id]) {
      delete newGenres[pick.id]
    } else {
      newGenres[pick.id] = pick.name
    }
    setSelectedGenres(newGenres)
  }

  const toggleStyle = function (pick: {id: number, name: string}) {
    const newStyles = {...selectedStyles}
    if (newStyles[pick.id]) {
      delete newStyles[pick.id]
    } else {
      newStyles[pick.id] = pick.name
    }
    setSelectedStyles(newStyles)
  }

  const submitComic = function () {
    const comic = {
      name,
      subdomain,
      description,
      selectedStyles,
      selectedGenres,
      visibility
    }
    axios({
      method: 'post',
      url: '/api/comic/new',
      data: comic
    })
      .then((res) => {
        console.log("eh")
      })
      .catch((err) => {
        setSubmissionError(true)
      })
  }
  
  useEffect(() => {    
    axios({
      method: 'get',
      url: '/api/genre'
    })
      .then((res) => {
        const data = Object.values(res.data)
        if (Array.isArray(data)) {
          setGenres(data as Genre[])
        }
      })
      .catch((err) => {
        console.error(err)
      })

    axios({
      method: 'get',
      url: '/api/comic/style'
    })
      .then((res) => {
        const data = Object.values(res.data)
        if (Array.isArray(data)) {
          setStyles(data as Style[])
        }
      })
      .catch((err) => {
        console.error(err)
      })

  }, [])


  return (
    <div>
      <h1>Create A Comic</h1>
      <TextInput
        labelText="Comic name"
        id="comic_name"
        onChange={(e) => {onNameChange(e)}}
      />

      <TextInput
        labelText="Comic Subdomain"
        id="comic_subdomain"
        helperText="Your comic will (eventually) be accessible at example.caveart.net"
        onChange={(e) => {onSubdomainChange(e)}}
      />

      <fieldset>
        <legend>Style</legend>
        <ComicTag
          selection={selectedStyles}
          options={styles}
          toggleOption={toggleStyle}
        />
      </fieldset>

      <fieldset>
        <legend>Genres</legend>
        <ComicTag
          selection={selectedGenres}
          options={genres}
          toggleOption={toggleGenre}
        />

      </fieldset>

      <label htmlFor="comic_description">Description</label>
      <textarea
        id="comic_description"
        onChange={(e) => {onDescriptionChange(e)}}
      >
      </textarea>

      <fieldset>
        <legend>Visibility</legend>
        {visibilities.map((option, idx) => {
          return (
            <div key={idx}>
              <input
                type="radio"
                checked={visibility === option}
                name="visibility"
                id={`visibility-${option}`}
                value={option}
                onChange={(e) => {onVisibilityChange(e)}}
              />
              <label htmlFor={`visibility-${option}`}>{option}</label>
            </div>
          )
        })}
      </fieldset>

      <Button
        type='button'
        onClick={() => {submitComic()}}
      >
        Create
      </Button>
      { submissionError ? <span>There was an issue submitting your new comic.</span> : '' }
    </div>
  )
}

export default NewComic;
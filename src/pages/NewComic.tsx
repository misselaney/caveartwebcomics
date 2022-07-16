import React, { useState, useEffect } from 'react'
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

const defaultGenres = {
  children: [],
  description: '',
  id: 0,
  lvl: 0,
  name: 'Loading',
  parent_id: 0
}

const defaultPicks = {}

const visibilities = ['Public', 'Unlisted', 'Private']

const styles = ["Illustration", "3D", "Sprites", "Photography"]

function NewComic() {
  const [genres, setGenres] = useState<Genre[]>([defaultGenres])
  const [name, setName] = useState<string>('')
  const [subdomain, setSubdomain] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [style, setStyle] = useState<string>('')
  const [selectedGenres, setSelectedGenres] = useState<{[key: string]: string}>(defaultPicks)
  const [visibility, setVisibility] = useState<string>('')

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
    console.log(newGenres)
    setSelectedGenres(newGenres)
  }
  
  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/genre'
    })
      .then((res) => {
        const data = Object.values(Object.values(res.data))
        if (Array.isArray(data)) {
          setGenres(data as Genre[])
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const renderGenreSelection = function (genres: Genre[]) {
    return (
      genres.map((genre, idx) => {
        const children = Object.values(genre.children)
        return (
          <div key={idx}>
            <input
              type="checkbox"
              id={`genre-${genre.id}`}
              name='genres'
              value={genre.id}
              onChange={() => {
                const pick = { id: genre.id, name: genre.name }
                toggleGenre(pick)
              }}
            >
            </input>
            <label htmlFor={`genre-${genre.id}`}>
              {genre.name}
            </label>
            { selectedGenres[genre.id] ? renderGenreSelection(children as Genre[]) : ''}
          </div>
        )
      })
    )
  }

  return (
    <div>
      <TextInput
        labelText="Comic name"
        id="comic_name"
        onChange={(e) => {onNameChange(e)}}
      />

      <TextInput
        labelText="Comic Subdomain"
        id="comic_subdomain"
        helperText="Your comic will (eventually) be accessible at example.caveart.net"
      />

      <fieldset>
        <legend>Style</legend>
        {styles.map((style, idx) => {
          return (
            <div key={idx}>
              <input
                name="comicStyle"
                type="radio"
                id={`style-${idx}`}
              />
              <label htmlFor={`style-${idx}`}>{style}</label>
            </div>
          )
        })}
      </fieldset>

      <fieldset>
        <legend>Genres</legend>
        {renderGenreSelection(genres)}
      </fieldset>

      <label htmlFor="comic_description">Description</label>
      <textarea
        id="comic_description"
        onChange={(e) => {onDescriptionChange}}
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
    </div>
  )
}

export default NewComic;
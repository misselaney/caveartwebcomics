import React from 'react'
import { Button, TextInput } from '@marissaconner/sousanne-component-library'

const styles = ["Illustration", "3D", "Sprites", "Photography"]

function NewComic() {
  return (
    <div>
      <TextInput
        labelText="Comic name"
        id="comic_name"
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
        <legend>Genre</legend>
        
      </fieldset>

    </div>
  )
}

export default NewComic;
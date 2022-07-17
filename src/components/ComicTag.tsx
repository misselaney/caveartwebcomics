import React from 'react'

interface Option {
  id: number,
  name: string,
  description: string,
  children?: object[]
}

interface Pick {
  id: number,
  name: string
}

interface ComicTagProps {
  options: Option[],
  toggleOption: (option: Pick) => void,
  selection: { [key:string]: string }
}

export const ComicTag = (props: ComicTagProps) => {
  const { options, toggleOption, selection } = props
  return (
    <div>
      {options.map((option, idx) => {
        const identifier = `${option.name.replace(/\W/g,'')}_${option.id}`
        let children = [] as Option[]
        if (option.children) {
          children = Object.values(option.children) as Option[]
        }
        return (
          <div key={idx}>
            <input
              type="checkbox"
              id={`option-${identifier}`}
              value={option.id}
              checked={!!selection[option.id]}
              onChange={() => toggleOption({ id: option.id, name: option.name })}
            >
            </input>
            <label htmlFor={`option-${identifier}`}>
              {option.name}
            </label>
            {selection[option.id] ? <ComicTag options={children} toggleOption={toggleOption} selection={selection} /> : ''}
          </div>
        )
      })}
    </div>
  )
}

export default ComicTag
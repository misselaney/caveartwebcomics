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
          <div key={idx} className="formfield checkbox">
            <input
              tab-index="0"
              type="checkbox"
              className="checkbox_control"
              id={`option-${identifier}`}
              value={option.id}
              checked={!!selection[option.id]}
              onChange={() => toggleOption({ id: option.id, name: option.name })}
            >
            </input>
            <label className="checkbox_label" htmlFor={`option-${identifier}`}>
              {option.name}
            </label>
            <div className={selection[option.id] ? 'indent expanded' : 'indent collapsed'}>
              <ComicTag options={children} toggleOption={toggleOption} selection={selection} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ComicTag

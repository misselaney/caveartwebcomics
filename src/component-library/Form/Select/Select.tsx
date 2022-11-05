import React, { useState, useRef, useEffect, MutableRefObject } from 'react'
import classNames from 'classnames'
import '../../design/Style.css'
import '../Form.css'
import './Select.css'

export interface OptionProps {
  value: string,
  label: string,
  onClick: () => void,
  disabled?: boolean
}

export interface SelectProps {
  id: string,
  options: OptionProps[],
  onClick: (...params: any) => any,
  classes?: string
  disabled?: boolean
  hasError?: boolean
}

const SelectOption = ({
  value,
  label,
  onClick,
  disabled
}: OptionProps) => {
  return(
    <button
      className="dropdown-menu_item"
      value={value}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

const DropdownSelect = ({
  id,
  options,
  classes = '',
  disabled,
  hasError,
  onClick,
  ...props
}: SelectProps) => {

  // const useOutsideAlerter = function (ref: MutableRefObject<null>) {
  //   useEffect(() => {
  //     const handleClickOutside = function (event: MouseEvent) {
  //       if (ref.current && !ref.current.contains(event.target)) {
  //         setIsOpen(false)
  //       }
  //     }
  //     // Bind the event listener
  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => {
  //       // Unbind the event listener on clean up
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, [ref]);
  // }

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = function (event: MouseEvent) {
      const target = event.target as Node
      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        setIsOpen(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef])

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleMenu = function () {
    setIsOpen(!isOpen)
  }

  return(
    <div ref={wrapperRef} className="form-field">
      <div className={`dropdown-menu ${classes} ${classNames({
        'Disabled': disabled,
        'Error': hasError
      })}`.trim()}>
        <button
          type="button"
          className={classNames({ 'dropdown-menu_toggler': true, 'Open': isOpen })}
          aria-label="open options menu"
          id={`${id}-toggler`}
          aria-pressed={isOpen}
          onClick={toggleMenu}
        >
          Open dropdown
        </button>
        <div
          area-expanded={isOpen.toString()}
          aria-labelledby={`${id}-toggler`}
          className={`dropdown-menu_panel ${classNames({ Opened: isOpen, Closed: !isOpen })}`}
        >
          <div className="dropdown-menu_itemlist" role="group" aria-label="Menu options">
            {options.map((option, idx) => {
              return (
                <SelectOption
                  key={idx}
                  value={option.value}
                  label={option.label}
                  onClick={() => {onClick(option.value); setIsOpen(false)}}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DropdownSelect
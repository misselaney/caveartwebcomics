import React from 'react'
import classNames from 'classnames'
import '../../design/Style.css'
import '../Form.css'

export interface FormFieldProps {
  children: React.ReactNode
  classes?: string
  disabled?: boolean
  hasError?: boolean
}

const FormField = ({
  children,
  classes = '',
  disabled,
  hasError,
  ...props
}: FormFieldProps) => {
  return(
    <div
      className={`form-field ${classes} ${classNames({
        'Disabled': disabled,
        'Error': hasError
      })}`.trim()}
    >
      {children}
    </div>
  )
}

export default FormField
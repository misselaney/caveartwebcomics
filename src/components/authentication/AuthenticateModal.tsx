import React, { useState, useEffect } from 'react'
import Login from './Login'
import Signup from './Signup'
import Button from '../../component-library/Button'
import Modal from '../../component-library/Modal'

interface AuthProps {
  isOpen: boolean
  initial: 'Sign Up' | 'Log In' | ''
  onClose: (...params: any) => any
  onAuth: (...params: any) => any
}
export const Authenticate = ({ isOpen, initial, onClose, onAuth, ...props }: AuthProps) => {
  const [authMode, setAuthMode] = useState<'Log In'|'Sign Up'|''>('')

  useEffect(() => {  
    console.log("init")
    setAuthMode(initial || '')
  }, [initial])

  return (<Modal
    size="md"
    id="authmodal_sign-up"
    ariaLabel={authMode}
    heading={authMode}
    isOpen={isOpen}
    onClose={onClose}
  >
    {authMode === 'Log In' ?
      <>
        <Login onLogIn={onAuth} />
        <Button
          id="authmodal_sign-up"
          look="muted"
          onClick={() => {setAuthMode('Sign Up')}}
        >
          Sign Up
        </Button>
      </>
      :
      <>
        <Signup onSignup={onAuth} />
        <Button
          id="authmodal_sign-up"
          look="muted"
          onClick={() => {setAuthMode('Log In')}}
        >
          Log In
        </Button>
      </>
    }
  </Modal>
  )
}

export default Authenticate
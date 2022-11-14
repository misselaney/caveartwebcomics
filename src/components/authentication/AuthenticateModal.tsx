import React, { useState, useEffect } from 'react'
import Login from './Login'
import Signup from './Signup'
import Button from '../../component-library/Button'
import Modal from '../../component-library/Modal'
import './AuthenticateModal.css'

interface AuthProps {
  isOpen: boolean
  initial: 'Sign Up' | 'Log In' | ''
  onClose: (...params: any) => any
  onAuth: (...params: any) => any
  loggedIn: boolean
}
export const Authenticate = ({ isOpen, initial, onClose, onAuth, loggedIn, ...props }: AuthProps) => {
  const [authMode, setAuthMode] = useState<'Log In'|'Sign Up'|''>('')
  
  useEffect(() => {  
    setAuthMode(initial || '')
  }, [initial])

  return (
    <>
      <Modal
        size="md"
        id="authmodal_sign-up"
        ariaLabel={authMode}
        heading={authMode}
        isOpen={isOpen}
        onClose={onClose}
      >

        { isOpen ? 
          <>
            { loggedIn ? 
              <div className="authmodal_confirmation">
                <img src="/public/img/brand/confirmationscrungus.png" alt="You have successfully authenticated."/>
                <p>You have successfully {authMode === 'Log In' ? 'logged in' : 'signed up'}!</p>
                <Button look="primary" id="continue" onClick={onClose}>
                  Into the cave!
                </Button>
              </div>
              :
              <>
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
              </>
            }
          </>
          :
          ""
        }
      </Modal>
    </>
  )
}

export default Authenticate
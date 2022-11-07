import React from 'react'
import ButtonSet from '../Button/ButtonSet/ButtonSet'
import Button from '../Button'

export interface SiteHeaderProps {
  loggedIn: boolean
  onLogout: (...params: any) => any
  onSignup: (...params: any) => any
}

const SiteHeader = ({
  loggedIn = false,
  onLogout,
  onSignup,
  ...props}: SiteHeaderProps) => {


  return (
    <div className="navigation">
      {
        loggedIn ? 
          (
            <Button id="header-logout" onClick={onLogout}>Log Out</Button>
          )
          :
          (
            <ButtonSet>
              <Button id="header-signup" onClick={onSignup}>Sign Up</Button>
              <Button id="header-login" look="primary">Log In</Button>
            </ButtonSet>
          )
      }  
    </div>
  )
}

export default SiteHeader

import React from 'react'
import ButtonSet from '../Button/ButtonSet/ButtonSet'
import Button from '../Button'
import Link from '../Link'
import './Navigation.css'

export interface SiteHeaderProps {
  loggedIn: boolean
  onLogout: (...params: any) => any
  onSignup: (...params: any) => any
  onLogIn: (...params: any) => any
}

const SiteHeader = ({
  loggedIn = false,
  onLogIn,
  onLogout,
  onSignup,
  ...props}: SiteHeaderProps) => {
  return (
    <div className="horizontal-nav">
      <div className="horizontal-nav_inner">
        <a href="/" className="horizontal-nav_brand">
          <img alt="Cave Art!" src='/public/img/brand/headerlogo.png' width='200' />
          <span className="horizontal-nav_tagline">Comics that rock!</span>
        </a>
        { loggedIn ? 
          <>
            <Link id="horizontal-nav_manage" href="/manage/comics">My Webcomics</Link>
            <Link id="horizontal-nav_manage" href="/manage">My Pull (Into Cave) List</Link>
          </>
          : ""
        }
        <div className="horizontal-nav_authentication">
          {
            loggedIn ? 
              (
                <Button id="header-logout" onClick={onLogout}>Log Out</Button>
              )
              :
              (
                <ButtonSet>
                  <Button id="header-signup" onClick={onSignup}>Sign Up</Button>
                  <Button id="header-login" onClick={onLogIn} look="primary">Log In</Button>
                </ButtonSet>
              )
          }
        </div>
      </div>
    </div>
  )
}

export default SiteHeader

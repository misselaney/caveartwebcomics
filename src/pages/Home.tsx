import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

interface HomeProps {
  onLogOut: () => void
}

export const Home = (props: HomeProps) => {
  const [loggedOut, setLoggedOut] = useState<boolean>(false)
  const [logoutError, setLogoutError] = useState<string>('')

  const logOut = async function() {
    try {
      props.onLogOut()
      setLoggedOut(true)
    }
    catch {
      setLogoutError("There was an issue logging out.")
    }
  }

  return (
    <div>
      { loggedOut ? <Navigate to="/login" /> : "" }
      <a href="/lists">Shopping Lists</a>
      <button onClick = {() => {logOut()}}>
        Log Out
      </button>
    </div>
  )
}

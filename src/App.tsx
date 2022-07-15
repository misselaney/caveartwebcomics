import React, { Component, useState } from 'react'
import { Route, Routes, Navigate, Outlet } from 'react-router-dom'
import Authenticate from './pages/Authenticate'
import { Home } from './pages/Home'
import Lists from './pages/Lists'
import NotFound from './pages/NotFound'
import axios from 'axios'
import '@marissaconner/sousanne-component-library/index.css'
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:5000'

function App() {
  const existingTokens = localStorage.getItem('tokens')

  const checkAuth = async function () {
    axios({
      method: 'get',
      url: 'http://localhost:5000/api/user/session',
    })
      .then((session) => {
        return true
      })
      .catch((err) => {
        return false
        console.error(existingTokens)
        console.error(err)
      })
  }

  const [auth, setAuth] = useState({
    token: existingTokens,
    loggedIn: Boolean(existingTokens)
  })

  const logIn = function (data: Record<string, unknown>) {
    localStorage.setItem('tokens', JSON.stringify(data))
    setAuth(prevState => ({
      ...prevState,
      token: localStorage.getItem('tokens'),
      loggedIn: true
    }))
  }

  const logOut = function () {
    axios({
      method: 'post',
      url: '/api/user/logout',
    })
      .then(() => {
        localStorage.setItem('tokens', '')
        setAuth(prevState => ({
          ...prevState,
          loggedIn: false
        }))
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function PrivateOutlet() {
    const isAuth = auth.loggedIn;
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
  }
  // TODO later: https://www.robinwieruch.de/react-router-private-routes/

  return (
    <Routes>
      <Route
        path="/login"
        element={<Authenticate onLogIn={logIn} />}
      />
      { auth.loggedIn ?
        <Route
          path="/home"
          element={<Home onLogOut={logOut} />}
        >
        </Route>
        :
        ''
      }
      { auth.loggedIn ?
        <Route
          path="/lists"
          element={<>
            <Lists />
          </>
          }
        >
        </Route>
        :
        ''
      }
      <Route
        path="*"
        element={<Authenticate onLogIn={logIn} />}
      />
    </Routes>
  )
}

export default App;
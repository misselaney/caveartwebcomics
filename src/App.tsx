import React, { useState } from 'react'
import { Route, Routes, Navigate, Outlet } from 'react-router-dom'
import Main from './pages/Main'
import { Home } from './pages/Home'
import ManageComics from './pages/ManageComics'
import NewComic from './pages/NewComic'
import Public from './pages/public'
import UploadComic from './pages/UploadComic'
// import CaveartHeader from './components/CaveartHeader'
import axios from 'axios'
const { Read, NotFound, TermsOfService, Authenticate } = Public

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:5000'

function App() {
  const existingTokens = localStorage.getItem('tokens')

  const checkAuth = async function () {
    return axios({
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

  const [loginOpen, setLoginOpen] = useState(false)
  
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
    closeModal()
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

  async function PrivateOutlet() {
    const isAuth = await checkAuth()
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
  }
  // TODO later: https://www.robinwieruch.de/react-router-private-routes/

  function closeModal () {
    setLoginOpen(false)
  }

  function openModal () {
    setLoginOpen(true)
    const el = document.querySelector('#global_login') as HTMLElement
    el.focus()
  }

  return (
    <div className="app">
      {/*      <Modal
        size="md"
        id="global_login"
        ariaLabel="Log in"
        heading="Log In"
        isOpen={loginOpen}
        onClose={closeModal}
      >
        <Authenticate
          onLogIn={logIn}
          mode='login'
        />
      </Modal>*/}

      {/* <CaveartHeader
        auth={auth.loggedIn}
        logOut={logOut}
        loginOpen={loginOpen}
        openModal={openModal}
      />*/}

      <div className={ loginOpen ? 'Blurred app_body' : 'app_body' }>
        <Routes>
          <Route
            path="/"
            element={<Main />}
          />

          <Route path="comic/:comic">
            <Route path="read">
              <Route path ="" element={<Read />} />
              <Route path =":page" element={<Read />} />
            </Route>
            <Route path="about" element={<></>} />
            <Route path="archive" element={<></>} />
            <Route path="gallery" element={<></>} />
            <Route path="cast" element={<></>} />
            <Route path="blog" element={<></>} />
            <Route path="store" element={<></>} />
          </Route>

          <Route
            path="policy">
            <Route path="tos" element ={<TermsOfService />} />
          </Route>

          {/*<Route
            path="user/:user"
            element={<User />}
          />*/}

          { auth.loggedIn ?
            <Route
              path="home"
              element={<Home onLogOut={logOut} />}
            >
            </Route>
            :
            ''
          }

          { auth.loggedIn ?
            <Route path="manage">
              <Route path="comics" element={<ManageComics />} />
              <Route path="new" element={<NewComic />} />
              <Route path="upload/:comic" element={<UploadComic />} />
            </Route>
            :
            ''
          }
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </div>

      <div className={ loginOpen ? 'Blurred app_footer' : 'app_footer' }>
        Footer
      </div>
    </div>
  )
}

export default App;
import React, { useState } from 'react'
import { Route, Routes, Navigate, Outlet } from 'react-router-dom'
import Main from './pages/Main'
import { Home } from './pages/Home'
import ManageComics from './pages/ManageComics'
import NewComic from './pages/NewComic'
import Public from './pages/public'
import UploadComic from './pages/UploadComic'
import Modal from './component-library/Modal'
import SiteHeader from './component-library/Navigation'
import axios from 'axios'
const { Read, NotFound, TermsOfService } = Public
import AuthenticateModal from './components/authentication/AuthenticateModal'
import Link from './component-library/Link'

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

  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'Sign Up' | 'Log In' | ''>('')

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

  async function PrivateOutlet() {
    const isAuth = await checkAuth()
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
  }
  // TODO later: https://www.robinwieruch.de/react-router-private-routes/

  function closeModal () {
    setAuthModalOpen(false)
  }

  function openAuth (mode: 'Log In' | 'Sign Up') {
    setAuthModalOpen(true)
    setAuthMode(mode)
    const el = document.querySelector('#authmodal_sign-up') as HTMLElement
    el.focus()
  }

  return (
    <div className="app">
      <AuthenticateModal
        isOpen={authModalOpen}
        onClose={closeModal}
        onAuth={logIn}
        loggedIn={auth.loggedIn}
        initial={authMode}
      />

      <SiteHeader
        loggedIn={auth.loggedIn}
        onSignup={() => {openAuth('Sign Up')}}
        onLogIn={()=> {openAuth('Log In')}}
        onLogout={logOut}
      />

      <div className={ authModalOpen ? 'Blurred app_body' : 'app_body' }>
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

      <div className={ authModalOpen ? 'Blurred app_footer' : 'app_footer' }>
        <Link id="footer_tos" href="/policy/tos">Terms of Service</Link>
      </div>
    </div>
  )
}

export default App;
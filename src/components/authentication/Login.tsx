import React, { useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import TextInput from '../../component-library/Form/TextInput'
import Button from '../../component-library/Button'

interface AuthProps {
  onLogIn: (data: Record<string, unknown>) => void,
}

export const Login = (props: AuthProps) => {
  const validateEmail = function () {
    setEmailError("")
    const regex = /^([\w.%+-]+)@([\w-]+).([\w]{2,})$/i
    const isValid = !!email.match(regex)
    setValidEmail(isValid)
  }

  const validatePassword = function () {
    setPasswordError("")
    const isValid = password.length > 7
    setValidPassword(isValid)
  }

  const onInputEmail = function (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setEmail(e.target.value)
    validateEmail()
  }

  const onInputPassword = function (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setPassword(e.target.value)
    validatePassword()
  }

  const cleanSlate = function () {
    setServerError('')
    setEmailError('')
    setPasswordError('')
    setEmailState('default')
    setPasswordState('default')
  }

  const validateLogin = function () {
    cleanSlate()
    validateEmail()
    if (!validEmail) {
      console.log("Email not valid.")
      setEmailError('Please enter a valid email address.')
      setEmailState('error')
    }
    validatePassword()
    if (!validPassword) {
      console.log("Password not valid.")
      setPasswordError('This password needs to be at least 8 characters long.')
      setPasswordState('error')
    }
  }

  const logIn = function () {
    validateLogin()
    if (validEmail && validPassword) {
      axios({
        method: 'post',
        url: '/api/user/login',
        data: { email, password }
      })
        .then((res) => {
          setEmail("")
          setPassword("")
          props.onLogIn(res.data)
        })
        .catch((err) => {
          setServerError(err.response.data)
        })
    }
  }

  const [email, setEmail] = useState<string>("")
  const [emailState, setEmailState] = useState<"default"|"error"|"valid">('default')
  const [password, setPassword] = useState<string>("")
  const [passwordState, setPasswordState] = useState<"default"|"error"|"valid">('default')
  const [validEmail, setValidEmail] = useState<boolean>(false)
  const [validPassword, setValidPassword] = useState<boolean>(false)
  const [serverError, setServerError] = useState<string>("")
  const [emailError, setEmailError] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")
  
  return (
    <div>
      <form noValidate>
        <fieldset>
          <TextInput
            errorText={emailError}
            id="login_email"
            labelText="Email"
            onChange={(e) => {onInputEmail(e)}}
            placeholderText="unga@bunga.com"
            status={emailState}
            type="email"
          />
          <TextInput
            errorText={passwordError}
            id="login_password"
            labelText="Password"
            onChange={(e) => {onInputPassword(e)}}
            status={passwordState}
            type="password"
          />
        </fieldset>
        <Button
          id="login_submit"
          type="button"
          onClick={logIn}
          look="primary"
        >
          Log In
        </Button>
        { serverError ? <span className="signup_server-message Error">{serverError}</span> : ''}
      </form>
    </div>
  )
}

export default Login;
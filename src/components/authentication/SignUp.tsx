import React, { useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import TextInput from '../../component-library/Form/TextInput'
import Button from '../../component-library/Button'
import Link from '../../component-library/Link'

export const Authenticate = (props: AuthProps) => {
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

  const validateName = function () {
    setNameError("")
    const isValid = name.length > 0
    setValidName(isValid)
  }

  const onInputEmail = function (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setEmail(e.target.value)
    validateEmail()
  }

  const onInputPassword = function (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setPassword(e.target.value)
    validatePassword()
  }

  const onInputName = function (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setName(e.target.value)
    validateName()
  }

  const validateSignup = function () {
    validateLogin()
    validateName()
    if (!validName) {
      setNameError('Please enter a valid username.')
      setFormValid(false)
    }
  }

  const validateLogin = function () {
    setServerError('')
    validateEmail()
    validatePassword()
    if (!validEmail) {
      setEmailError('Please enter a valid email address.')
    }
    if (!validPassword) {
      setPasswordError('This password needs to be at least 8 characters long.')
    }
    setFormValid(validPassword && validEmail)
  }

  const logIn = function () {
    validateLogin()
    if (formValid) {
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
          console.error(err)
          setServerError(err.response.data)
        })
    } else {
      setPasswordState(validPassword ? 'default' : 'error')
      setEmailState(validEmail ? 'default' : 'error')
    }
  }

  const signUp = function () {
    validateSignup()
    if (formValid) {
      axios({
        method: 'post',
        url: '/api/user/new',
        data: { email, password }
      })
        .then((res) => {
          setEmail("")
          setPassword("")
          props.onLogIn(res.data)
        })
        .catch((err) => {
          console.error(err)
          setServerError("This email address already exists.")
        })
    } else {
      setPasswordState(validPassword ? 'default' : 'error')
      setEmailState(validEmail ? 'default' : 'error')
    }
  }

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [emailState, setEmailState] = useState<"default"|"error"|"valid">('default')
  const [passwordState, setPasswordState] = useState<"default"|"error"|"valid">('default')
  const [nameState, setNameState] = useState<"default"|"error"|"valid">('default')
  const [password, setPassword] = useState<string>("")
  const [validEmail, setValidEmail] = useState<boolean>(false)
  const [validName, setValidName] = useState<boolean>(false)
  const [validPassword, setValidPassword] = useState<boolean>(false)
  const [formValid, setFormValid] = useState<boolean>(false)
  const [serverError, setServerError] = useState<string>("")
  const [emailError, setEmailError] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")
  const [nameError, setNameError] = useState<string>("")
  const [mode, setMode] = useState<string>(props.initMode)

  const emailStatus = function () {
    if (!validEmail) {
      return 'error'
    }
    return 'default'
  }

  const passwordStatus = function () {
    if (!validPassword) {
      return 'error'
    }
    return 'default'
  }

  return (
    <div>
      <form noValidate>
        <fieldset>
          <TextInput
            labelText="Username"
            id="signup_name"
            onChange={(e) => {onInputName(e)}}
            type="text"
            placeholderText="Captain Caveman"
          />
          <TextInput
            labelText="Email"
            id="signup_email"
            onChange={(e) => {onInputEmail(e)}}
            placeholderText="unga@bunga.com"
            type="email"
            errorText="Please use a valid email."
          />
          <TextInput
            labelText="Password"
            helperText="Pick a strong password!"
            errorText="Password must be 8 characters or less."
            id="signup_password"
            onChange={(e) => {onInputPassword(e)}}
            type="password"
          />
        </fieldset>
        <Button
          id="authenticate_signup"
          type="button"
          onClick={signUp}
          look="primary"
        >
          Sign Up
        </Button>
        <Button
          id="authenticate_switch-mode"
          type="button"
          onClick={logIn}
          look="muted"
        >
          Log In
        </Button>
        { serverError ? <span className="signup_server-message Error">{serverError}</span> : ''}
      </form>
    </div>
  )
}

export default Authenticate;
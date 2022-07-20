import React, { useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { Button, TextInput } from '@marissaconner/sousanne-component-library'

interface AuthProps {
  onLogIn: (data: Record<string, unknown>) => void
}

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

  const onInputEmail = function (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setEmail(e.target.value)
    validateEmail()
  }

  const onInputPassword = function (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setPassword(e.target.value)
    validatePassword()
  }

  const validateForm = function () {
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
    validateForm()
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
    validateForm()
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

  const [email, setEmail] = useState<string>("")
  const [emailState, setEmailState] = useState<"default"|"error"|"valid">('default')
  const [passwordState, setPasswordState] = useState<"default"|"error"|"valid">('default')
  const [password, setPassword] = useState<string>("")
  const [validEmail, setValidEmail] = useState<boolean>(false)
  const [validPassword, setValidPassword] = useState<boolean>(false)
  const [formValid, setFormValid] = useState<boolean>(false)
  const [serverError, setServerError] = useState<string>("")
  const [emailError, setEmailError] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")

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
            placeholderText="email@domain.com"
            labelText="Email"
            id="signup_email"
            onChange={(e) => {onInputEmail(e)}}
            status={emailState}
            errorText={emailError}
            type="email"
          />
          <TextInput
            placeholderText=""
            labelText="Password"
            id="signup_password"
            onChange={(e) => {onInputPassword(e)}}
            status={passwordState}
            errorText={passwordError}
            type="password"
          />
        </fieldset>
        <Button
          id="authenticate_signup"
          type="button"
          onClick={signUp}
          look="muted"
        >
          Sign Up
        </Button>
        <Button
          id="authenticate_login"
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

export default Authenticate;
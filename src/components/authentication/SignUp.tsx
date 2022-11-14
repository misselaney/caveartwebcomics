import React, { useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import TextInput from '../../component-library/Form/TextInput'
import Button from '../../component-library/Button'

interface AuthProps {
  onSignup: (data: Record<string, unknown>) => void,
}

export const Signup = (props: AuthProps) => {
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

  const validatePasswordVerification = function () {
    const isValid = password === passwordVerification
    setValidPasswordVerification(isValid)
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

  const onInputPasswordVerification = function (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setPasswordVerification(e.target.value)
    validatePasswordVerification()
  }

  const onInputName = function (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setName(e.target.value)
    validateName()
  }

  const cleanSlate = function () {
    setServerError('')
    setEmailError('')
    setPasswordError('')
    setNameError('')
    setEmailState('default')
    setPasswordState('default')
    setNameState('default')
    setPasswordVerificationState('default')
  }

  const validateSignup = function () {
    cleanSlate()
    validateName()
    validateEmail()
    validatePassword()
    validatePasswordVerification()
    if (!validName) {
      setNameError('Please enter a valid username.')
      setNameState('error')
    }
    if (!validEmail) {
      setEmailError('Please enter a valid email address.')
      setEmailState('error')
    }
    if (!validPassword) {
      setPasswordError('This password needs to be at least 8 characters long.')
      setPasswordState('error')
    }
    if (!validPasswordVerification) {
      setPasswordVerificationState('error')
    }
  }

  const signUp = function () {
    validateSignup()
    if (validName && validEmail && validPassword && validPasswordVerification) {
      axios({
        method: 'post',
        url: '/api/user/new',
        data: { name, email, password }
      })
        .then((res) => {
          setName("")
          setEmail("")
          setPassword("")
          props.onSignup(res.data)
        })
        .catch((err) => {
          console.error(err)
          setServerError("This email address already exists.")
        })
    }
  }

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordVerification, setPasswordVerification] = useState<string>("")

  const [emailState, setEmailState] = useState<"default"|"error"|"valid">('default')
  const [passwordState, setPasswordState] = useState<"default"|"error"|"valid">('default')
  const [nameState, setNameState] = useState<"default"|"error"|"valid">('default')
  const [passwordVerificationState, setPasswordVerificationState] = useState<"default"|"error"|"valid">('default')
  
  const [validName, setValidName] = useState<boolean>(false)
  const [validEmail, setValidEmail] = useState<boolean>(false)
  const [validPassword, setValidPassword] = useState<boolean>(false)
  const [validPasswordVerification, setValidPasswordVerification] = useState<boolean>(false)

  const [nameError, setNameError] = useState<string>("")
  const [emailError, setEmailError] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")
  const [serverError, setServerError] = useState<string>("")
  

  return (
    <div>
      <form noValidate>
        <fieldset>
          <TextInput
            labelText="Username"
            id="signup_name"
            onChange={(e) => {onInputName(e)}}
            status={nameState}
            type="text"
            placeholderText="Captain Caveman"
            errorText={nameError}
          />
          <TextInput
            labelText="Email"
            id="signup_email"
            onChange={(e) => {onInputEmail(e)}}
            status={emailState}
            placeholderText="unga@bunga.com"
            type="email"
            errorText={emailError}
          />
          <TextInput
            labelText="Password"
            helperText="Pick a password with at least 8 characters!"
            placeholderText=""
            errorText={passwordError}
            status={passwordState}
            id="signup_password"
            onChange={(e) => {onInputPassword(e)}}
            type="password"
          />
          <TextInput
            labelText="Verify Password"
            errorText="Passwords must match."
            placeholderText=""
            status={passwordVerificationState}
            id="signup_password_verification"
            onChange={(e) => {onInputPasswordVerification(e)}}
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
        { serverError ? <span className="signup_server-message Error">{serverError}</span> : ''}
      </form>
    </div>
  )
}

export default Signup;
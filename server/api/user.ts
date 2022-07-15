import  Express, { Request, Response } from 'express'
import { db } from '../index'
import { QueryResult } from 'pg'
import { createHash, compareHash, createRandom } from '../utils/hash'
import { auth } from './database/auth'

const userRoutes = Express.Router()

userRoutes.post('/new', async (req: Request, res: Response) => {
  const email = req.body.email.replace(/[^a-zA-Z0-9@._-]/gi, '')
  const hashedPassword = createHash(req.body.password)
  const queryResult = await auth.createNewUser(email, hashedPassword)
  if (queryResult.error) {
    res.status(500).send(queryResult)
  } else {
    res.status(200).send(queryResult)
  }
})

userRoutes.post('/login', async (req: Request, res: Response) => {
  const email = req.body.email.replace(/[^a-zA-Z0-9@._-]/gi, '')
  const hashedPassword = createHash(req.body.password)
  const queryResult = await auth.getUserByCredentials(email, hashedPassword)
  if (queryResult.error) {
    res.status(500).send(queryResult)
  } else {
    const userId = queryResult.id
    const sessionHash = createHash(createRandom())
    auth.updateUserSession(userId, sessionHash)
    res.cookie('sousannesession', sessionHash)
    res.cookie('sousanneuser', userId)
    const token = {
      sousanne: sessionHash,
      sousanneId: userId
    }
    res.status(200).send(token)
  }
})

userRoutes.post('/logout', async (req: Request, res: Response) => {
  const id = req.cookies.sousanneuser
  const session = req.cookies.sousannesession
  const queryResult = await auth.clearUserSession(session, id)
  if (queryResult.error) {
    res.status(500).send(queryResult)
  } else {
    res.status(200).send()
  }
})

userRoutes.get('/session', async (req: Request, res: Response) => {
  const id = req.cookies.sousanneuser
  const session = req.cookies.sousannesession
  const queryResult = await auth.confirmUserSession(session, id)
  if (queryResult.error) {
    res.status(403).send(queryResult)
  } else {
    res.status(200).send(queryResult)
  }
})

export default userRoutes
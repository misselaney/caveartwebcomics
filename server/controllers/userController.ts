import { Request, Response } from 'express'
import { createHash, createRandom } from '../utils/hash'
import { auth } from '../services/auth'

export const userController = {
  createUser: async function (req: Request, res: Response) {
    const email = req.body.email.replace(/[^a-zA-Z0-9@._-]/gi, '')
    const hashedPassword = createHash(req.body.password)
    const newUser = await auth.createNewUser(email, hashedPassword)
    if (newUser.error) {
      res.status(500).send(newUser.error)
    }
    res.status(200).send(newUser)
  },

  login: async function (req: Request, res: Response) {
    const email = req.body.email.replace(/[^a-zA-Z0-9@._-]/gi, '')
    const hashedPassword = createHash(req.body.password)
    const loginAttempt = await auth.getUserByCredentials(email, hashedPassword)
    if (loginAttempt.error) {
      res.status(500).send(loginAttempt.error)
    }
    else {
      const userId = loginAttempt.id
      const sessionHash = createHash(createRandom())
      auth.updateUserSession(userId, sessionHash)
      res.cookie('caveartwebcomicssession', sessionHash)
      res.cookie('caveartwebcomicsuser', userId)
      const token = {
        caveartwebcomics: sessionHash,
        caveartwebcomicsId: userId
      }
      res.status(200).send(token)
    }
  },

  logout: async function (req: Request, res: Response) {
    const id = req.cookies.caveartwebcomicsuser
    const session = req.cookies.caveartwebcomicssession
    const logoutAttempt = await auth.clearUserSession(session, id)
    if (logoutAttempt.error) {
      res.status(500).send(logoutAttempt.error)
    }
    res.status(200).send()
  },

  getSession: async function (req: Request, res: Response) {
    const id = req.cookies.caveartwebcomicsuser
    const session = req.cookies.caveartwebcomicssession
    const sessionInfo = await auth.confirmUserSession(session, id)
    if (sessionInfo.error) {
      res.status(403).send(sessionInfo)
    }
    res.status(200).send(sessionInfo)
  }
}

export default userController

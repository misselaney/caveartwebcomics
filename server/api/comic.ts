import  Express, { Request, Response } from 'express'
import { db } from '../index'
import { QueryResult } from 'pg'
import { comic } from './database/comic'
import { style } from './database/style'
import { IComic } from '../interfaces'

const comicRoutes = Express.Router()

comicRoutes.post('/new', async (req: Request, res: Response) => {
  const { name, string, selectedStyles, subdomain, description, selectedGenres, visibility } = req.body
  const author = req.cookies.sousanneuser
  const comicData = { name, string, subdomain, description, visibility, author } as IComic
  let queryResult = await comic.create(comicData)
  if (queryResult.error) {
    res.status(500).send(queryResult)
  } else {
    const comicID = queryResult.id
    queryResult = await comic.addGenres(comicID, selectedGenres)
    queryResult = await comic.addStyles(comicID, selectedStyles)
    if (queryResult.error) {
      res.status(500).send(queryResult)
    } else {
      res.status(200).send(queryResult)
    }
  }
})

comicRoutes.get('/style', async (req: Request, res: Response) => {
  let queryResult = await style.getAllStyles()
  if (Array.isArray(queryResult)) {
    res.status(200).send(queryResult)
  } else {
    res.status(500).send({ error: 'There was an issue retrieving styles.' })
  }
})

export default comicRoutes
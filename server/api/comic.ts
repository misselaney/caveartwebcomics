import  Express, { Request, Response } from 'express'
import { db } from '../index'
import { QueryResult } from 'pg'
import { comic } from './database/comic'
import { IComic } from '../interfaces'

const comicRoutes = Express.Router()

comicRoutes.post('/new', async (req: Request, res: Response) => {
  const { name, string, style, subdomain, description, selectedGenres, visibility } = req.body
  const author = req.cookies.sousanneuser
  const comicData = { name, string, style, subdomain, description, visibility, author } as IComic
  let queryResult = await comic.create(comicData)
  if (queryResult.error) {
    console.log(queryResult)
    res.status(403).send(queryResult)
  } else {
    const comicID = queryResult.id
    queryResult = await comic.addGenres(comicID, selectedGenres)
    res.status(200).send(queryResult)
  }
})

export default comicRoutes
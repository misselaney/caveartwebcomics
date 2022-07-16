import  Express, { Request, Response } from 'express'
import { db } from '../index'
import { QueryResult } from 'pg'
import { genre } from './database/genre'

const genreRoutes = Express.Router()

genreRoutes.get('/', async (req: Request, res: Response) => {
  const queryResult = await genre.getGenres()
  if (queryResult.error) {
    res.status(403).send(queryResult)
  } else {
    res.status(200).send(queryResult)
  }
})

genreRoutes.get('/subgenre/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const queryResult = await gebre.getSubgenres(id)
  if (queryResult.error) {
    res.status(403).send(queryResult)
  } else {
    res.status(200).send(queryResult)
  }
})

genreRoutes.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const queryResult = await gebre.getGenre(id)
  if (queryResult.error) {
    res.status(403).send(queryResult)
  } else {
    res.status(200).send(queryResult)
  }
})

export default userRoutes
import Express from 'express'
import comicController from '../controllers/comicController'
const comicRoutes = Express.Router()
import { Request, Response } from 'express'

comicRoutes.post('/new', comicController.create)
comicRoutes.get('/by/:author', comicController.getByAuthor)
comicRoutes.get('/mine', comicController.getByEndUser)

export default comicRoutes
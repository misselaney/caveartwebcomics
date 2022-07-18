import Express from 'express'
import comicController from '../controllers/comicController'
const comicRoutes = Express.Router()
import { Request, Response } from 'express'

comicRoutes.post('/new', comicController.createComic)

export default comicRoutes
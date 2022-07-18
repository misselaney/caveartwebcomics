import Express from 'express'
import categoryController from '../controllers/categoryController'
const categoryRoutes = Express.Router()

categoryRoutes.get('/genre', categoryController.getGenres)
categoryRoutes.get('/style', categoryController.getStyles)
categoryRoutes.get('/trigger', categoryController.getTriggers)

export default categoryRoutes
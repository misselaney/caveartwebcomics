import Express from 'express'
import userController from '../controllers/userController'
const userRoutes = Express.Router()

userRoutes.post('/new', userController.createUser)
userRoutes.post('/login', userController.login)
userRoutes.post('/logout', userController.logout)
userRoutes.get('/session', userController.getSession)

export default userRoutes
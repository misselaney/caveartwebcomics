import Express from 'express'
import bodyParser from 'body-parser'
import cookieParser from './utils/cookieParser'
import path from 'path'
import cors from 'cors'
import userRoutes from './routes/user'
import categoryRoutes from './routes/category'
import comicRoutes from './routes/comic'

const port = process.env.PORT || 5000
const router = Express.Router()

let app: Express.Application | undefined = undefined
app = Express()
app.use(bodyParser.json())
app.use(Express.urlencoded({extended: true}))
app.use(cookieParser)
app.use((req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  console.log(`Incoming ${req.method} request to ${req.path}`)
  next()
})
app
  .use(cors({
    credentials: true,
    methods: 'GET, POST, DELETE, PUT, PATCH, OPTIONS',
    origin: 'http://localhost',
    allowedHeaders: ['Access-Control-Allow-Origin', 'Content-Type', 'Authorization', 'X-Requested-With', 'Origin', 'Accept'],
  })
)

app.use('/api/user', userRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/comic', comicRoutes)

app.use(Express.static(path.join(__dirname, '/../build')))

app.get('*', function (req: Express.Request, res: Express.Response) {
  console.log(`Catchall route recieved: ${req.path}.`)
  res.sendFile(path.join(__dirname+'/../public/index.html'))
})

app.listen(port)

console.log('App is listening on port ' + port)
module.exports = app

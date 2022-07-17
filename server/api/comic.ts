import Express, { Request, Response } from 'express'
import { comic } from './database/comic'
import { style } from './database/style'
import { IComic } from '../interfaces'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const comicRoutes = Express.Router()

const extensions = ['.png', '.gif', '.jpg', 'jpeg']

const fileStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads')
  },
  filename: function (req, file, callback) {
    console.log(file)
    callback(null, `${file.fieldname}-${Date.now()}-${path.extname(file.originalname)}`)
  }
})

const uploads = multer({
  storage: fileStorage,
  fileFilter: function(req, file, callback) {
    console.log('file filter is running')
    const ext = path.extname(file.originalname);
    console.log(file)
    if (!extensions.includes(ext)) {
      console.log('Invalid file extenson')
      return
    }
    fs.exists(`./uploads/${file.originalname}`, function (exists) {
      if (exists) {
       console.log('This image already exists.')
       return
      }
    })
    callback(null, true)
  }
})
.single('file')

comicRoutes.post('/new', async (req: Request, res: Response) => {
  const { name, string, selectedStyles, subdomain, description, selectedGenres, visibility } = req.body
  const author = req.cookies.caveartwebcomicsuser
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
  const queryResult = await style.getAllStyles()
  if (Array.isArray(queryResult)) {
    res.status(200).send(queryResult)
  } else {
    res.status(500).send({ error: 'There was an issue retrieving styles.' })
  }
})

comicRoutes.get('/author/:id', async (req: Request, res: Response) => {
  const author = parseInt(req.params.id)
  const queryResult = await comic.getComicsByAuthor(author)
  if (Array.isArray(queryResult)) {
    res.status(200).send(queryResult)
  } else {
    res.status(500).send({ error: queryResult.error || 'Error getting comics by this author.' })
  }
})

comicRoutes.post('/upload', uploads, async (req: Request, res: Response) => {

  res.status(200).send()
})

export default comicRoutes
import Express, { Request, Response, NextFunction } from 'express'
import { comic } from './database/comic'
import { style } from './database/style'
import { IComic } from '../interfaces'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { createHash, createRandom } from '../utils/hash'
import translator from '../languages/translate'

const comicRoutes = Express.Router()
const t = translator.translate
const extensions = ['.png', '.gif', '.jpg', '.jpeg']

const fileStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads')
  },
  filename: function (req, file, callback) {
    const fileHash = createHash(createRandom()).substr(1,10)
    const fileName = `${file.fieldname}_${fileHash}_${Date.now()}${path.extname(file.originalname)}`
    callback(null, fileName)
  }
})

const uploadNewComicPage = multer({
  storage: fileStorage,
  limits: {
    fieldSize: 1500 * 1024,
    fieldNameSize: 200
  },
  fileFilter: function(req, file, callback) {
    const ext = path.extname(file.originalname);
    if (!extensions.includes(ext)) {
      callback(new Error('Invalid file extension.'))
      return
    }
    fs.exists(`./uploads/${file.originalname}`, function (exists) {
      if (exists) {
       callback(new Error('This image already exists.'))
       return
      }
    })
    callback(null, true)
  }
})
.single('comicpage')

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

comicRoutes.post('/upload', async (req: Request, res: Response) => { 
  uploadNewComicPage(req, res, async function(err) {
    if (err) {
      res.status(500).send({ error: err.message })
    }

    if (req.file?.path) {
      const valid = await comic.isValidAuthor(req.body.comic, req.cookies.caveartwebcomicsuser)
      if (valid) {
        const page = {
          img: req.file.path,
          pageNumber: req.body.pageNumber || await comic.getNextPageNumber(req.body.comic),
          comicId: req.body.comic
        }
        const queryResult = await comic.createPage(page)
        if (queryResult.error) {
          res.status(500).send({ error: 'Server error ocurred when saving a file upload to a particular comic:' + queryResult.error })
        }
        res.status(200).send()
      } else {
        console.log("Not valid.")
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error(err)
          }
        })
        res.status(400).send({error: t('noPermissionToEditComic')})
      }
    }

    else {
      res.status(500).send({ error: 'Miscellaneous server error ocurred after uploading the image file.' })
    }
  })
})

export default comicRoutes
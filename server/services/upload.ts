import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
import { createHash, createRandom } from '../utils/hash'
import { extname } from 'path'
import fs from 'fs'



const extensions = ['.png', '.gif', '.jpg', '.jpeg']


type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

export const fileStorage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    callback(null, './public/img')
  },
  
  filename: (
    req: Request,
    file: Express.Multer.File, 
    callback: FileNameCallback
  ): void => {
    console.log("File storage filename running")
    const fileHash = createHash(createRandom()).substr(1,10)
    const fileName = `${file.fieldname}_${fileHash}_${Date.now()}${extname(file.originalname)}`
    callback(null, fileName)
  }
})

export const fileFilter = function(req: Request, file: Express.Multer.File, callback: FileFilterCallback) {
  console.log("File filter")
  const ext = extname(file.originalname)
  if (!extensions.includes(ext)) {
    callback(new Error('This image already exists.'))
    return
  }
  fs.exists(`./public/img/${file.originalname}`, function (exists) {
    console.log("exists running")
    if (exists) {
      callback(null, false)
      return
    }
  callback(null, true)
  })
}

export const uploadNewComicPage = multer({
  storage: fileStorage,
  limits: {
    fieldSize: 1500 * 1024,
    fieldNameSize: 200
  },
  fileFilter: fileFilter
})
  .single('comicpage')

export const uploadAsset = multer({
  storage: fileStorage,
  limits: {
    fieldSize: 400 * 1024,
    fieldNameSize: 200
  },
  fileFilter: fileFilter
})
  .fields([{name: 'avatar', maxCount: 1}, {name: 'banner', maxCount: 1}, {name: 'thumbnail', maxCount: 1},])
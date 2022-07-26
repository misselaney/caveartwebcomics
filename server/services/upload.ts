import multer from 'multer'
import { createHash, createRandom } from '../utils/hash'
import path from 'path'
import fs from 'fs'

const extensions = ['.png', '.gif', '.jpg', '.jpeg']

const fileStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/img')
  },
  filename: function (req, file, callback) {
    const fileHash = createHash(createRandom()).substr(1,10)
    const fileName = `${file.fieldname}_${fileHash}_${Date.now()}${path.extname(file.originalname)}`
    callback(null, fileName)
  }
})

const imageFilter = function(req, file, callback) {
  const ext = path.extname(file.originalname);
  if (!extensions.includes(ext)) {
    callback(new Error('Invalid file extension.'))
    return
  }
  fs.exists(`./img/${file.originalname}`, function (exists) {
    if (exists) {
      callback(new Error('This image already exists.'))
      return
    }
  })
}

export const uploadNewComicPage = multer({
  storage: fileStorage,
  limits: {
    fieldSize: 1500 * 1024,
    fieldNameSize: 200
  },
  fileFilter: imageFilter
})
  .single('comicpage')

export const uploadAsset = multer({
  storage: fileStorage,
  limits: {
    fieldSize: 400 * 1024,
    fieldNameSize: 200
  },
  fileFilter: imageFilter
})
  .fields([{name: 'avatar', maxCount: 1}, {name: 'banner', maxCount: 1}, {name: 'thumbnail', maxCount: 1},])
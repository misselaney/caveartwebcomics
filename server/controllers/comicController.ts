import { Request, Response } from 'express'
import { IComic, ITableNameIDPair, IComicPage } from '../interfaces'
import { category } from '../services/category'
import { comic } from '../services/comic'
import { auth } from '../services/auth'
import { uploadNewComicPage } from '../services/upload'
import { getComicID } from '../utils/queryHelpers'
import fs from 'fs'

export const comicController = {
  create: async function (req: Request, res: Response) {
    const { name, string, selectedStyles, subdomain, description, selectedGenres, visibility } = req.body
    const author = req.cookies.caveartwebcomicsuser
    const comicData = { name, string, subdomain, description, visibility, author } as IComic
    let newComic = await comic.create(comicData)
    if (newComic.error) {
      if (newComic.error.includes('comics_author_name_key')) {
        newComic.error = `You already have a comic called ${name}.`
      }
      if (newComic.error.includes('comics_subdomain_key')) {
        newComic.error = `There is already a comic that uses the alias ${subdomain}.`
      }
      res.status(500).send(newComic)
    }
    const comicID = newComic.id
    newComic = await category.associateGenres(comicID, selectedGenres)
    newComic = await category.associateStyles(comicID, selectedStyles)
    if (newComic.error) {
      comic.delete(comicID)
      res.status(500).send(newComic)
    }
    res.status(200).send({ id: comicID })
  },

  getByAuthor: async function (req: Request, res: Response) {
    const author = req.body.author
    const comics = await comic.getByAuthor(author)
    if (comics.error) {
      res.status(500).send(comics.error)
    }
    res.status(200).send(comics)
  },

  getByEndUser: async function (req: Request, res: Response) {
    const author = req.cookies.caveartwebcomicsuser
    const comics = await comic.getByAuthor(author)
    if (comics.error) {
      res.status(500).send(comics.error)
    }
    res.status(200).send(comics)
  },

  getRecent: async function (req: Request, res: Response) {
    const comics = await comic.getRecent()
    if (comics.error) {
      res.status(500).send(comics.error)
    }
    res.status(200).send(comics)
  },

  addPage: async (req: Request, res: Response) => {
    uploadNewComicPage(req, res, async function(err) {
      if (err) {
        res.status(500).send({ error: err.message })
      }
      let comicID = await getComicID(req.body.comic)
      if (comicID < 0) {
        res.status(500).send({ error: `Couldn't identify the comic you want to upload to.`})
      }

      if (req.file?.path) {
        const valid = await auth.isAuthor(req.body.comic, req.cookies.caveartwebcomicsuser)
        if (valid) {
          let pageCount = req.body.pageNumber
          if (req.body.pageNumber === undefined) {
            pageCount = await comic.getPageCount(req.body.comic)
          }
          const nextPageNumber = pageCount + 1
          const page = {
            img: req.file.path,
            pageNumber: nextPageNumber,
            comicId: comicID
          }
          const queryResult = await comic.createPage(page)
          if (queryResult.error) {
            res.status(500).send({ error: 'Server error ocurred when saving a file upload to a particular comic:' + queryResult.error })
          }
          res.status(200).send()
        } else {
          fs.unlink(req.file.path, (err) => {
            if (err) {
              console.error(err)
            }
          })
          res.status(400).send({error: 'No permission to edit comic.'})
        }
      }
      else {
        res.status(500).send({ error: 'Miscellaneous server error ocurred after uploading the image file.' })
      }
    })
  },

  getPage: async (req: Request, res: Response) => {
    let comicID = await getComicID(req.params.comic)
    if (comicID < 0) {
      res.status(500).send({ error: `This comic doesn't seem to exist.`})
    }
    const queryResult = await comic.getPage(comicID, parseInt(req.params.page))
    if (queryResult.error) {
      res.status(500).send({ error: `There was an issue getting a comic page: ${queryResult.error}`})
    }
    res.status(200).send(queryResult)
  },

  getPageCount: async (req: Request, res: Response) => {
    let comicID = await getComicID(req.params.comic)
    if (comicID < 0) {
      res.status(500).send({ error: `This comic doesn't seem to exist.`})
    }
    const queryResult = await comic.getPageCount(req.params.comic)
    console.log(queryResult)
    res.status(200).send({ count: queryResult})
  }
}

export default comicController
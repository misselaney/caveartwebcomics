import { Request, Response } from 'express'
import { IComic, ITableNameIDPair, IComicPage } from '../interfaces'
import { category } from '../services/category'
import { comic } from '../services/comic'

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
  }
}

export default comicController
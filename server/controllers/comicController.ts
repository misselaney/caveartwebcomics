import { Request, Response } from 'express'
import { IComic, ITableNameIDPair, IComicPage } from '../interfaces'
import { category } from '../database/category'
import { comic } from '../database/comic'

export const comicController = {
  createComic: async function (req: Request, res: Response) {
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
  }
}

export default comicController
import { Request, Response } from 'express'
import { IComic, ITableNameIDPair, IComicPage } from '../interfaces'
import { category } from '../database/category'

export const categoryController = {
  getStyles: async function (req: Request, res: Response) {
    const styles = await category.getStyles()
    if (!styles.error) {
      res.status(200).send(styles)
    }
    res.status(500).send({ error:  `There was an issue retrieving styles: ${styles.error}` })
  },

  getGenres: async function (req: Request, res: Response) {
    const genres = await category.getGenres()
    if (!genres.error) {
      res.status(200).send(genres)
    }
    res.status(500).send({ error: `There was an issue retrieving genres: ${genres.error}` })
    
  }, 

  getTriggers: async function (req: Request, res: Response) {
    const triggers = await category.getTriggers()
    if (!triggers.error) {
      res.status(200).send(triggers)
    }
    res.status(500).send({ error: `There was an issue retrieving triggers: ${triggers.error}` })
  }, 
}

export default categoryController

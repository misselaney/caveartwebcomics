import { QueryResult } from 'pg'
import { IComic, ITableNameIDPair, IComicPage } from '../../interfaces'
import PoolConnection from '../../database/connection'

export const comic = {
  create: async function (comic: IComic) {
    const pool = await PoolConnection.get().connect()
    const sql = `
      INSERT INTO comics (name, subdomain, description, author)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `
    const values = [comic.name, comic.subdomain, comic.description, comic.author]
    const result = await pool
      .query(sql, values)
      .then((data: QueryResult<any>) => {
        return data.rows[0]
      })
      .catch((err: Error) => {
        return { error: err.message }
      })
    pool.release()
    return result
  },
  addGenres: async function (comic: number, genres: ITableNameIDPair[]) {
    const pool = await PoolConnection.get().connect()
    const concatRows = function (accumulator: string, currentValue: string) {
      return `${accumulator}, (${comic}, ${currentValue})`
    }
    console.log(genres)
    const genreIDs = Object.keys(genres)
    const initValue = `(${comic}, ${genreIDs.shift()})`
    const sql = `
      INSERT INTO comics_to_genres (comic_id, genre_id)
      VALUES ${genreIDs.reduce(concatRows, initValue)}`
    console.log(sql)
    const result = await pool
      .query(sql)
      .then((data: QueryResult<any>) => {
        return data.rows[0]
      })
      .catch((err: Error) => {
        return { error: err.message }
      })
    pool.release()
    return result
  },
  addStyles: async function (comic: number, styles: ITableNameIDPair[]) {
    const pool = await PoolConnection.get().connect()
    const concatRows = function (accumulator: string, currentValue: string) {
      return `${accumulator}, (${comic}, ${currentValue})`
    }

    const styleIDs = Object.keys(styles)
    const initValue = `(${comic}, ${styleIDs.shift()})`
    const sql = `
      INSERT INTO comics_to_styles (comic_id, style_id)
      VALUES ${styleIDs.reduce(concatRows, initValue)}
    `
    const result = await pool
      .query(sql)
      .then((data: QueryResult<any>) => {
        return data.rows
      })
      .catch((err: Error) => {
        return { error: err.message }
      })
    pool.release()
    return result
  },
  getComicsByAuthor: async function (author: number) {
    const pool = await PoolConnection.get().connect()
    const result = await pool
      .query(`SELECT * FROM comics WHERE author = $1`, [author])
      .then((data: QueryResult<any>) => {
        return data.rows
      })
      .catch((err: Error) => {
        return { error: err.message }
      })
    pool.release()
    return result
  },
  isValidAuthor: async function (comic: number | string, author: number) {
    const pool = await PoolConnection.get().connect()
    const sql = `SELECT 1 FROM comics WHERE (id = $1 OR subdomain = '$1') AND author = $2`
    const result = await pool
      .query(sql, [comic, author])
      .then((data: QueryResult<any>) => {
        return !!data.rows[0]
      })
      .catch((err: Error) => {
        return { error: err.message }
      })
    pool.release()
    return result
  },
  getNextPageNumber: async function (comic: number) {
    const pool = await PoolConnection.get().connect()
    const sql = `SELECT count(id) + 1 as pagenumber FROM comicpages WHERE comic_id = $1`
    const result = await pool
      .query(sql, [comic])
      .then((data: QueryResult<any>) => {
        return data.rows[0].pagenumber
      })
      .catch((err: Error) => {
        return { error: err.message }
      })
      pool.release()
      return result
  },
  createPage: async function (page: IComicPage) {
    const pool = await PoolConnection.get().connect()
    const { img, pageNumber, comicId } = page
    const sql = `INSERT INTO comicpages (img, page_number, comic_id) VALUES ($1, $2, $3) RETURNING id`
    const result = await pool
      .query(sql, [img, pageNumber, comicId])
      .then((data: QueryResult<any>) => {
        return data.rows[0]
      })
      .catch((err: Error) => {
        return { error: err.message }
      })
      pool.release()
      return result
  },
}

export default comic
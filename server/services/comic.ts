import { QueryResult } from 'pg'
import PoolConnection from './connection'
import { IComic, IComicPage } from '../interfaces'

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

  delete: async function (comic: number) {
    const pool = await PoolConnection.get().connect()
    const sql = `DELETE FROM comics WHERE id = $1`
    const values = [comic]
    const result = await pool
      .query(sql, values)
      .then((data: QueryResult<any>) => {
        return data.rows
      })
      .catch((err: Error) => {
        return { error: err.message }
      })
    pool.release()
    return result
  },

  getByAuthor: async function (author: number) {
    const pool = await PoolConnection.get().connect()
    const sql = `SELECT * FROM comics WHERE author = $1`
    const values = [author]
    const result = await pool
      .query(sql, values)
      .then((data: QueryResult<any>) => {
        return data.rows
      })
      .catch((err: Error) => {
        return { error: err.message }
      })
    pool.release()
    return result
  },

  getRandom: async function (count: number = 12) {
    const pool = await PoolConnection.get().connect()
    const sql = `SELECT * FROM comics WHERE author = $1 ORDER BY RANDOM() LIMIT $1`
    const values = [count]
    const result = await pool
      .query(sql, values)
      .then((data: QueryResult<any>) => {
        return data.rows
      })
      .catch((err: Error) => {
        return { error: err.message }
      })
    pool.release()
    return result
  },

  getRecent: async function (count: number = 12) {
    const pool = await PoolConnection.get().connect()
    const sql = `
    SELECT DISTINCT
      c.id,
      c.name,
      c.description,
      c.thumbnail,
      c.subdomain,
      p.release_on
    FROM comics c
    JOIN comicpages p
    ON p.comic_id = c.id
    WHERE
      c.unlisted IS FALSE
      and
      c.private IS FALSE
    ORDER BY p.release_on DESC
    LIMIT $1
    `
    const values = [count]
    const result = await pool
      .query(sql, values)
      .then((data: QueryResult<any>) => {
        return data.rows
      })
      .catch((err: Error) => {
        return { error: err.message }
      })
    pool.release()
    return result
  },

  getComicID: async function (alias: string) {
    const pool = await PoolConnection.get().connect()
    const sql = `SELECT id FROM comics WHERE subdomain = $1`
    console.log(sql)
    const result = await pool
      .query(sql, [alias])
      .then((data: QueryResult<any>) => {
        console.log(data.rows)
        return data.rows[0]
      })
      .catch((err: Error) => {
        return { error: err.message }
      })
      pool.release()
      return result
  },

  getPageCount: async function (comic: string) {
    const pool = await PoolConnection.get().connect()
    const sql = `SELECT count(p.id) as pagecount FROM comicpages p JOIN comics c ON c.id=p.comic_id  WHERE ${parseInt(comic) > 0 ? 'p.comic_id' : 'c.subdomain' } = $1`
    console.log(sql)
    const result = await pool
      .query(sql, [comic])
      .then((data: QueryResult<any>) => {
        console.log(data.rows)
        return data.rows[0].pagecount
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

  getPage: async function (comicID: number, pageNumber: number) {
    const pool = await PoolConnection.get().connect()
    const sql = `SELECT * from comicpages WHERE comic_id = $1 AND page_number = $2`
    const result = await pool
      .query(sql, [comicID, pageNumber])
      .then((data: QueryResult<any>) => {
        return data.rows[0]
      })
      .catch((err: Error) => {
        return { error: err.message }
      })
      pool.release()
      return result
  }
}

export default comic
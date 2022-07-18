import { QueryResult } from 'pg'
import PoolConnection from './connection'
import { IComic } from '../interfaces'

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
  }
}

export default comic
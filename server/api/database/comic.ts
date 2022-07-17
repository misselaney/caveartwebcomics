import { db } from '../../index'
import { QueryResult } from 'pg'
import { IComic, ITableNameIDPair } from '../../interfaces'

export const comic = {
  create: async function (comic: IComic) {
    const pool = await db.connect()
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
    console.log("AddGenres")
    const pool = await db.connect()
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
  getAllStyles: async function () {
    const pool = await db.connect()
    const sql =  `SELECT id, name FROM styles`
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
  addStyles: async function (comic: number, styles: ITableNameIDPair[]) {
    console.log("AddStyles")
    const pool = await db.connect()
    const concatRows = function (accumulator: string, currentValue: string) {
      return `${accumulator}, ${comic}, ${currentValue}`
    }

    const styleIDs = Object.keys(styles)
    const initValue = `(${comic}, ${styleIDs.shift()})`
    const sql = `
      INSERT INTO comics_to_styles (comic_id, style_id)
      VALUES ${styleIDs.reduce(concatRows, initValue)}
    `
    console.log(sql)
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
  }
}

export default comic
import { QueryResult } from 'pg'
import PoolConnection from './connection'
import { buildNestedChildren, buildOneToManyRowValues } from '../utils/queryHelpers'
import { ITableNameIDPair } from '../interfaces'

export const category = {
  getStyles: async function () {
    const pool = await PoolConnection.get().connect()
    const sql =  buildNestedChildren('styles')
    const result = await pool
      .query(sql)
        .then((data: QueryResult<any>) => {
          return data.rows[0].jsonb_object_agg
        })
        .catch((err: Error) => {
          return { error: err.message }
        })
    pool.release()
    return result
  },

  getGenres: async function () {
    const pool = await PoolConnection.get().connect()
    const sql = buildNestedChildren('genres')
    const result = await pool
      .query(sql)
        .then((data: QueryResult<any>) => {
          return data.rows[0].jsonb_object_agg
        })
        .catch((err: Error) => {
          return { error: err.message }
        })
    pool.release()
    return result
  },

  getTriggers: async function () {
    const pool = await PoolConnection.get().connect()
    const sql = buildNestedChildren('triggers')
    const result = await pool
      .query(sql)
        .then((data: QueryResult<any>) => {
          return data.rows[0].jsonb_object_agg
        })
        .catch((err: Error) => {
          return { error: err.message }
        })
    pool.release()
    return result
  },

  associateGenres: async function (comic: number, genres: ITableNameIDPair[]) {
    if (Object.keys(genres).length > 0) {
      const pool = await PoolConnection.get().connect()
      const sql = `
        INSERT INTO comics_to_genres (comic_id, genre_id)
        VALUES ${buildOneToManyRowValues(comic, genres)}`
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
    }
    return genres
  },

  associateStyles: async function (comic: number, styles: ITableNameIDPair[]) {
    if (Object.keys(styles).length > 0) {
      const pool = await PoolConnection.get().connect()
      const sql = `
        INSERT INTO comics_to_styles (comic_id, style_id)
        VALUES ${buildOneToManyRowValues(comic, styles)}`
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
    }
    return styles
  },

  associateTriggers: async function (comic: number, triggers: ITableNameIDPair[]) {
    if (Object.keys(triggers).length > 0) {
      const pool = await PoolConnection.get().connect()
      const sql = `
        INSERT INTO comics_to_triggers (comic_id, trigger_id)
        VALUES ${buildOneToManyRowValues(comic, triggers)}`
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
    }
    return triggers
  }

}

export default category
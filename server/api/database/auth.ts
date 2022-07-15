import { db } from '../../index'
import { QueryResult } from 'pg'

export const auth = {
  createNewUser: async function (email: string, passwordHash: string) {
    const pool = await db.connect()
    const sql = `
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING id
    `
    const values = [email, passwordHash]
    const result = await pool
      .query(sql, values)
        .then((data: QueryResult<any>) => {
          return data.rows[0]
        })
        .catch((err: Error) => {
          return { error: 'An error occurred creating a new user.' }
        })
    pool.release()
    return result
  },
  getUserByCredentials: async function (email: string, passwordHash: string) {
    const pool = await db.connect()
    const sql = 'SELECT id FROM users WHERE email=$1 AND password=$2'
    const values = [email, passwordHash]
    const result = await pool
      .query(sql, values)
        .then((data: QueryResult<any>) => {
          if (data.rows.length === 1) {
            return data.rows[0]
          }
          return { error: 'No such user with this login information.' }
        })
        .catch((err: Error) => {
          return { error: 'No such user with this login information.' }
        })
    pool.release()
    return result
  },
  updateUserSession: async function (userId: number, sessionHash: string) {
    const pool = await db.connect()
    const sql = `
      UPDATE users
      SET
      session_hash=$1
      WHERE
      id =$2
    `
    const values = [sessionHash, userId]
    const result = await pool
      .query(sql, values)
        .then(() => {
          return { hash: sessionHash }
        })
        .catch((err: Error) => {
          return { error: 'Error updating user session.' }
        })
    pool.release()
    return result
  },
  confirmUserSession: async function (sessionHash: string, id: number) {
    const pool = await db.connect()
    const sql = `
      SELECT id
      FROM users
      WHERE
      session_hash=$1
      AND
      id=$2
    `
    const values = [sessionHash, id]
    const result = await pool
      .query(sql, values)
        .then((data: QueryResult<any>) => {
          if (data.rows.length === 1) {
            return data.rows[0]
          }
          return { error: 'No such user with this login information.' }
        })
        .catch((err: Error) => {
          return { error: 'Error obtaining a user with that session hash.' }
        })
      pool.release()
      return result
  },
  clearUserSession: async function (sessionHash: string, id: number) {
    const pool = await db.connect()
    const sql = `UPDATE users SET session_hash = null WHERE id = $2 AND session_hash = $1`
    const values = [sessionHash, id]
    const result = await pool
      .query(sql, values)
        .then(() => {
          return { error: false }
        })
        .catch((err: Error) => {
          return { error: 'Error logging out.' }
        })
      pool.release()
      return result
  }
}

export default auth
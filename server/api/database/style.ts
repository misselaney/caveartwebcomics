import { QueryResult } from 'pg'
import PoolConnection from '../../database/connection'

export const style = {
  getAllStyles: async function () {
    const pool = await PoolConnection.get().connect()
    const sql =  `SELECT id, name, description FROM styles`
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

  export default style
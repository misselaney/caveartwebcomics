import { db } from '../../index'
import { QueryResult } from 'pg'

export const style = {
  getAllStyles: async function () {
    const pool = await db.connect()
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
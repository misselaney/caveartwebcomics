import { db } from '../../index'
import { QueryResult } from 'pg'

export const genre = {
  getSubgenres: async function (id) {
    const sql = `
    WITH RECURSIVE tree AS
    (
      SELECT
        id,
        name,
        ARRAY[]::INTEGER[] AS ancestors
      FROM genres 
      WHERE parent_id IS NULL
      UNION ALL SELECT
        genre.id,
        genre.name,
        tree.ancestors || genre.parent_id
      FROM
        genres,
        tree
      WHERE
        genres.parent_id = tree.id
    )
    SELECT
      id,
      name
    FROM tree
    WHERE $1=ANY(tree.ancestors)
    `
    const values = [id]
    const result = await pool
      .query(sql, values)
        .then((data: QueryResult<any>) => {
          return data.rows
        })
        .catch((err: Error) => {
          return { error: 'An error occurred searching for subgenres.' }
        })
    pool.release()
    return result
  },
  getGenres: async function () {
    const result = await pool
      .query('SELECT id, name, description FROM genres WHERE parent_id IS NULL')
        .then((data: QueryResult<any>) => {
          return data.rows
        })
        .catch((err: Error) => {
          return { error: 'An error occurred searching for genres.' }
        })
    pool.release()
    return result
  },
  getGenre: async function (id) {
    const result = await pool
      .query('SELECT name, description FROM genres WHERE id=$1', [id])
        .then((data: QueryResult<any>) => {
          return data.rows[0]
        })
        .catch((err: Error) => {
          return { error: 'An error occurred searching for a genre.' }
        })
    pool.release()
    return result
  },
}

export default genre
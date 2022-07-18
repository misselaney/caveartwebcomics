import { QueryResult } from 'pg'
import PoolConnection from '../../database/connection'

const buildNestedChildren = function (id: number = 0) {
  return `WITH RECURSIVE tree AS (
      SELECT *, 0 as lvl
      FROM   genres
      WHERE  parent_id ${id !== 0 ? '=$1' : ' IS NULL'}

      UNION ALL
      
      SELECT child.*, parent.lvl + 1
      FROM   genres child
      JOIN   tree parent ON parent.id = child.parent_id
    ),
    maxlvl AS (
      SELECT max(lvl) maxlvl FROM tree
    ),
    g_tree AS (
        SELECT
            lvl,
            name,
            id,
            parent_id,
            description,
            jsonb '{}' children
        FROM   tree, maxlvl
        WHERE  lvl = maxlvl

        UNION 
        (
          SELECT
            (branch_parent).lvl,
            (branch_parent).name,
            (branch_parent).id,
            (branch_parent).parent_id,
            (branch_parent).description,
            jsonb_object_agg((branch_child).name, branch_child) as children
          FROM (
            SELECT branch_parent, branch_child
            FROM tree branch_parent
            JOIN g_tree branch_child ON branch_child.parent_id = branch_parent.id
          ) branch
          GROUP BY branch.branch_parent
              
          UNION
              
          SELECT
            c.lvl, c.name, c.id, c.parent_id, c.description, jsonb '{}' children
          FROM tree c
          WHERE NOT EXISTS (SELECT 1 FROM tree hypothetical_child WHERE hypothetical_child.parent_id = c.id)
        )
    )
    SELECT jsonb_object_agg(g_tree.name, g_tree)
    FROM g_tree
    WHERE lvl = 0;`
}

export const genre = {
  getAllGenres: async function () {
    const pool = await PoolConnection.get().connect()
    const sql =  buildNestedChildren()
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
  getGenre: async function (id: number) {
    const pool = await PoolConnection.get().connect()
    const result = await pool
      .query('SELECT name, description FROM genres WHERE id=$1', [id])
        .then((data: QueryResult<any>) => {
          return data.rows
        })
        .catch((err: Error) => {
          return { error: err.message }
        })
    pool.release()
    return result
  },
}

export default genre
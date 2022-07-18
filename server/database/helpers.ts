import { ITableNameIDPair } from '../interfaces'

export const buildNestedChildren = function (table: string, id: number = 0) {
  return `WITH RECURSIVE tree AS (
      SELECT *, 0 as lvl
      FROM   ${table}
      WHERE  parent_id ${id !== 0 ? '=$1' : ' IS NULL'}

      UNION ALL
      
      SELECT child.*, parent.lvl + 1
      FROM   ${table} child
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

export const buildOneToManyRowValues = function (one: number, many: ITableNameIDPair[]) {
  const list = []
  for (let i = 0; i < many.length; i++) {
    list.push(many[i].id)
  }
  const initValue = `(${one}, ${list.shift()})`
  const addRow = function (accumulator: string, currentValue: string) {
    return `${accumulator}, (${one}, ${currentValue})`
  }
  return list.reduce(addRow, initValue)
}
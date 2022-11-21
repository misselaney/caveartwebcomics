"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComicID = exports.buildOneToManyRowValues = exports.buildNestedChildren = void 0;
const comic_1 = require("../services/comic");
const buildNestedChildren = function (table, id = 0) {
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
    WHERE lvl = 0;`;
};
exports.buildNestedChildren = buildNestedChildren;
const buildOneToManyRowValues = function (one, many) {
    console.log('***********************************************');
    console.log(many);
    const list = Object.keys(many);
    const initValue = `(${one}, ${list.shift()})`;
    const addRow = function (accumulator, currentValue) {
        return `${accumulator}, (${one}, ${currentValue})`;
    };
    return list.reduce(addRow, initValue);
};
exports.buildOneToManyRowValues = buildOneToManyRowValues;
const getComicID = function (query) {
    return __awaiter(this, void 0, void 0, function* () {
        let comicID = -1;
        if (parseInt(query) > 0) {
            comicID = parseInt(query);
        }
        else {
            const comicIDQuery = yield comic_1.comic.getComicID(query);
            if (comicIDQuery.error) {
                return -1;
            }
            comicID = comicIDQuery.id;
        }
        return comicID;
    });
};
exports.getComicID = getComicID;

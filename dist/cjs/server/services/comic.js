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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comic = void 0;
const connection_1 = __importDefault(require("./connection"));
exports.comic = {
    create: function (comic) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield connection_1.default.get().connect();
            const sql = `
      INSERT INTO comics (name, subdomain, description, author)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;
            const values = [comic.name, comic.subdomain, comic.description, comic.author];
            const result = yield pool
                .query(sql, values)
                .then((data) => {
                return data.rows[0];
            })
                .catch((err) => {
                return { error: err.message };
            });
            pool.release();
            return result;
        });
    },
    delete: function (comic) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield connection_1.default.get().connect();
            const sql = `DELETE FROM comics WHERE id = $1`;
            const values = [comic];
            const result = yield pool
                .query(sql, values)
                .then((data) => {
                return data.rows;
            })
                .catch((err) => {
                return { error: err.message };
            });
            pool.release();
            return result;
        });
    },
    getByAuthor: function (author) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield connection_1.default.get().connect();
            const sql = `SELECT * FROM comics WHERE author = $1`;
            const values = [author];
            const result = yield pool
                .query(sql, values)
                .then((data) => {
                return data.rows;
            })
                .catch((err) => {
                return { error: err.message };
            });
            pool.release();
            return result;
        });
    },
    getRandom: function (count = 12) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield connection_1.default.get().connect();
            const sql = `SELECT * FROM comics WHERE author = $1 ORDER BY RANDOM() LIMIT $1`;
            const values = [count];
            const result = yield pool
                .query(sql, values)
                .then((data) => {
                return data.rows;
            })
                .catch((err) => {
                return { error: err.message };
            });
            pool.release();
            return result;
        });
    },
    getRecent: function (count = 12) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield connection_1.default.get().connect();
            const sql = `
    SELECT DISTINCT
      id,
      name,
      description,
      thumbnail,
      subdomain
    FROM (
      SELECT
        c.id,
        c.name,
        c.description,
        c.thumbnail,
        c.subdomain,
        p.release_on
      FROM comics c
      JOIN comicpages p
      ON p.comic_id = c.id
      WHERE
        c.unlisted IS FALSE
        AND
          c.private IS FALSE
      ORDER BY p.release_on DESC
      LIMIT $1
    ) latestpages
    `;
            const values = [count];
            const result = yield pool
                .query(sql, values)
                .then((data) => {
                return data.rows;
            })
                .catch((err) => {
                return { error: err.message };
            });
            pool.release();
            return result;
        });
    },
    getComicID: function (alias) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield connection_1.default.get().connect();
            const sql = `SELECT id FROM comics WHERE subdomain = $1`;
            console.log(sql);
            const result = yield pool
                .query(sql, [alias])
                .then((data) => {
                console.log(data.rows);
                return data.rows[0];
            })
                .catch((err) => {
                return { error: err.message };
            });
            pool.release();
            return result;
        });
    },
    getPageCount: function (comic) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield connection_1.default.get().connect();
            const sql = `SELECT count(p.id) as pagecount FROM comicpages p JOIN comics c ON c.id=p.comic_id WHERE ${parseInt(comic) > 0 ? 'p.comic_id' : 'c.subdomain'} = $1`;
            const result = yield pool
                .query(sql, [comic])
                .then((data) => {
                console.log(data.rows);
                return parseInt(data.rows[0].pagecount);
            })
                .catch((err) => {
                return { error: err.message };
            });
            pool.release();
            return result;
        });
    },
    createPage: function (page) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield connection_1.default.get().connect();
            const { img, pageNumber, comicId } = page;
            const sql = `INSERT INTO comicpages (img, page_number, comic_id) VALUES ($1, $2, $3) RETURNING id`;
            const result = yield pool
                .query(sql, [img, pageNumber, comicId])
                .then((data) => {
                return data.rows[0];
            })
                .catch((err) => {
                return { error: err.message };
            });
            pool.release();
            return result;
        });
    },
    getPage: function (comicID, pageNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield connection_1.default.get().connect();
            const sql = `SELECT * from comicpages WHERE comic_id = $1 AND page_number = $2`;
            const result = yield pool
                .query(sql, [comicID, pageNumber])
                .then((data) => {
                return data.rows[0];
            })
                .catch((err) => {
                return { error: err.message };
            });
            pool.release();
            return result;
        });
    }
};
exports.default = exports.comic;

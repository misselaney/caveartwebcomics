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
exports.auth = void 0;
const translate_1 = __importDefault(require("../languages/translate"));
const t = translate_1.default.translate;
const connection_1 = __importDefault(require("./connection"));
exports.auth = {
    createNewUser: function (email, passwordHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield connection_1.default.get().connect();
            const sql = `
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING id
    `;
            const values = [email, passwordHash];
            const result = yield pool
                .query(sql, values)
                .then((data) => {
                return data.rows[0];
            })
                .catch((err) => {
                return { error: t('createNewUserError') };
            });
            pool.release();
            return result;
        });
    },
    getUserByCredentials: function (email, passwordHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield connection_1.default.get().connect();
            const sql = 'SELECT id FROM users WHERE email=$1 AND password=$2';
            const values = [email, passwordHash];
            const result = yield pool
                .query(sql, values)
                .then((data) => {
                if (data.rows.length === 1) {
                    return data.rows[0];
                }
                return { error: t('noSuchUser') };
            })
                .catch((err) => {
                return { error: t('noSuchUser') };
            });
            pool.release();
            return result;
        });
    },
    updateUserSession: function (userId, sessionHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield connection_1.default.get().connect();
            const sql = `
      UPDATE users
      SET
      session_hash=$1
      WHERE
      id =$2
    `;
            const values = [sessionHash, userId];
            const result = yield pool
                .query(sql, values)
                .then(() => {
                return { hash: sessionHash };
            })
                .catch((err) => {
                return { error: t('errorUpdatingSession') };
            });
            pool.release();
            return result;
        });
    },
    confirmUserSession: function (sessionHash, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield connection_1.default.get().connect();
            const sql = `
      SELECT id
      FROM users
      WHERE
      session_hash=$1
      AND
      id=$2
    `;
            const values = [sessionHash, id];
            const result = yield pool
                .query(sql, values)
                .then((data) => {
                if (data.rows.length === 1) {
                    return data.rows[0];
                }
                return { error: t('noSuchUser') };
            })
                .catch((err) => {
                return { error: t('invalidSession') };
            });
            pool.release();
            return result;
        });
    },
    clearUserSession: function (sessionHash, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield connection_1.default.get().connect();
            const sql = `UPDATE users SET session_hash = null WHERE id = $2 AND session_hash = $1`;
            const values = [sessionHash, id];
            const result = yield pool
                .query(sql, values)
                .then(() => {
                return { error: false };
            })
                .catch((err) => {
                return { error: t('errorOnLogOut') };
            });
            pool.release();
            return result;
        });
    },
    isAuthor: function (comic, author) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield connection_1.default.get().connect();
            const sql = `SELECT 1 FROM comics WHERE (id = $1 OR subdomain = '$1') AND author = $2`;
            const result = yield pool
                .query(sql, [comic, author])
                .then((data) => {
                return !!data.rows[0];
            })
                .catch((err) => {
                return { error: err.message };
            });
            pool.release();
            return result;
        });
    },
};
exports.default = exports.auth;

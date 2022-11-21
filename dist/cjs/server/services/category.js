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
exports.category = void 0;
const connection_1 = __importDefault(require("./connection"));
const queryHelpers_1 = require("../utils/queryHelpers");
exports.category = {
    getStyles: function () {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield connection_1.default.get().connect();
            const sql = (0, queryHelpers_1.buildNestedChildren)('styles');
            const result = yield pool
                .query(sql)
                .then((data) => {
                return data.rows[0].jsonb_object_agg;
            })
                .catch((err) => {
                return { error: err.message };
            });
            pool.release();
            return result;
        });
    },
    getGenres: function () {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield connection_1.default.get().connect();
            const sql = (0, queryHelpers_1.buildNestedChildren)('genres');
            const result = yield pool
                .query(sql)
                .then((data) => {
                return data.rows[0].jsonb_object_agg;
            })
                .catch((err) => {
                return { error: err.message };
            });
            pool.release();
            return result;
        });
    },
    getTriggers: function () {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield connection_1.default.get().connect();
            const sql = (0, queryHelpers_1.buildNestedChildren)('triggers');
            const result = yield pool
                .query(sql)
                .then((data) => {
                return data.rows[0].jsonb_object_agg;
            })
                .catch((err) => {
                return { error: err.message };
            });
            pool.release();
            return result;
        });
    },
    associateGenres: function (comic, genres) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Object.keys(genres).length > 0) {
                const pool = yield connection_1.default.get().connect();
                const sql = `
        INSERT INTO comics_to_genres (comic_id, genre_id)
        VALUES ${(0, queryHelpers_1.buildOneToManyRowValues)(comic, genres)}`;
                const result = yield pool
                    .query(sql)
                    .then((data) => {
                    console.log(data.rows);
                    return { id: comic };
                })
                    .catch((err) => {
                    return { error: err.message };
                });
                pool.release();
                return result;
            }
            return genres;
        });
    },
    associateStyles: function (comic, styles) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Object.keys(styles).length > 0) {
                const pool = yield connection_1.default.get().connect();
                const sql = `
        INSERT INTO comics_to_styles (comic_id, style_id)
        VALUES ${(0, queryHelpers_1.buildOneToManyRowValues)(comic, styles)}`;
                const result = yield pool
                    .query(sql)
                    .then((data) => {
                    return { id: comic };
                })
                    .catch((err) => {
                    return { error: err.message };
                });
                pool.release();
                return result;
            }
            return styles;
        });
    },
    associateTriggers: function (comic, triggers) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Object.keys(triggers).length > 0) {
                const pool = yield connection_1.default.get().connect();
                const sql = `
        INSERT INTO comics_to_triggers (comic_id, trigger_id)
        VALUES ${(0, queryHelpers_1.buildOneToManyRowValues)(comic, triggers)}`;
                const result = yield pool
                    .query(sql)
                    .then((data) => {
                    return data.rows[0];
                })
                    .catch((err) => {
                    return { error: err.message };
                });
                pool.release();
                return result;
            }
            return triggers;
        });
    }
};
exports.default = exports.category;

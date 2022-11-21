"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolConnection = void 0;
const pgconfig_1 = __importDefault(require("../configs/pgconfig"));
const pg_1 = require("pg");
class PoolConnection {
    constructor() {
        return new pg_1.Pool(pgconfig_1.default);
    }
    static get() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new PoolConnection();
        return this.instance;
    }
}
exports.PoolConnection = PoolConnection;
exports.default = PoolConnection;

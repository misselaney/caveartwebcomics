"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pgConfig = void 0;
exports.pgConfig = {
    max: 20,
    idleTimeoutMillis: 30000,
    user: 'postgres',
    host: 'localhost',
    database: 'caveart',
    password: 'bacon',
    port: 5432,
};
exports.default = exports.pgConfig;

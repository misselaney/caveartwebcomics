"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandom = exports.compareHash = exports.createHash = void 0;
const crypto = require('crypto');
/**
* Make a SHA256 hash with optional salt
* @param {string} data
* @param {string} [salt]
* @returns {string} with the hashed value.
*/
const createHash = function (data, salt) {
    let sum = crypto.createHash('sha256');
    sum.update(data + salt);
    return sum.digest('hex');
};
exports.createHash = createHash;
/**
* Compare two hashes
* @param {string} input
* @param {string} compareTo
* @param {string} [salt]
*/
const compareHash = function (input, compareTo, salt) {
    const hashedAttempt = (0, exports.createHash)(input, salt);
    return compareTo === hashedAttempt;
};
exports.compareHash = compareHash;
const createRandom = function () {
    return crypto.randomBytes(32).toString('hex');
};
exports.createRandom = createRandom;

const crypto = require('crypto')

/**
* Make a SHA256 hash with optional salt
* @param {string} data
* @param {string} [salt]  
* @returns {string} with the hashed value.
*/
export const createHash = function (data: string, salt?: string) {
  let sum = crypto.createHash('sha256')
  sum.update(data + salt)
  return sum.digest('hex')
}

/**
* Compare two hashes 
* @param {string} input
* @param {string} compareTo
* @param {string} [salt]
*/
export const compareHash = function (input: string, compareTo: string, salt?: string) {
  const hashedAttempt = createHash(input, salt)
  return compareTo === hashedAttempt
}

export const createRandom = function () {
  return crypto.randomBytes(32).toString('hex')
}
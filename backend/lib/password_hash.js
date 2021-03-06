const bcrypt = require('bcrypt')

async function hash(password) {
  return bcrypt.hash(password, 13)
}

async function compare(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword)
}

module.exports = {
  hash,
  compare,
}

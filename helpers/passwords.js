const bcryptjs = require('bcryptjs')

module.exports.hash = (realPassword) => {
  const salt = bcryptjs.genSaltSync(10)
  return bcryptjs.hashSync(realPassword, salt)
}

module.exports.compare = (inputPassword, storedHash) => {
  return bcryptjs.compareSync(inputPassword, storedHash)
}


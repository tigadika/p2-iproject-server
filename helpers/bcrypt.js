const bcrypt = require("bcryptjs");

const newHashPassword = (password) => {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(password, salt);
};

const compareHashPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = {
  newHashPassword,
  compareHashPassword,
};

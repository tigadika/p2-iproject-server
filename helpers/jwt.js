const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET;

const createToken = (payload) => {
  return jwt.sign(payload, secretKey);
};

const readToken = (token) => {
  return jwt.verify(token, secretKey);
};
//
module.exports = {
  createToken,
  readToken,
};

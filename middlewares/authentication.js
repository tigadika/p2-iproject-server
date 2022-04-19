const { User } = require("../models");
const { readToken } = require("../helpers/json-webtoken");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const payload = readToken(access_token);

    const userFound = await User.findOne({ where: { email: payload.email } });

    req.user = {
      id: userFound.id,
      username: userFound.username,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;

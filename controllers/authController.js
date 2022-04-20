const { Op } = require("sequelize");
const { compareHashPassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

const { User } = require("../models");

class AuthController {
  static async registerHandler(req, res, next) {
    try {
      const { username, email, password } = req.body;

      await User.create({
        username,
        email,
        password,
      });

      res.status(201).json({
        message: "User has been created successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async loginHandler(req, res, next) {
    try {
      const { user, password } = req.body;

      //? User validation handler
      const loginUser = await User.findOne({
        where: {
          [Op.or]: [{ email: user }, { username: user }],
        },
      });

      if (!loginUser) throw { name: "UserNotValid" };

      const validateUser = compareHashPassword(password, loginUser.password);

      if (!validateUser) throw { name: "UserNotValid" };

      //? Token handler section
      const payload = {
        email: loginUser.email,
      };

      const accessToken = createToken(payload);

      res.status(200).json({
        statusCode: 200,
        access_token: accessToken,
        id: loginUser.id,
        username: loginUser.username,
        email: loginUser.email,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;

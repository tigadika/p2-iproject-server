const { UserPair, Pair } = require("../models/index");

class UserPairController {
  static async getBookmark(req, res, next) {
    try {
      const myBookmark = await UserPair.findAll({
        where: {
          UserId: req.user.id,
        },
        include: [
          {
            model: Pair,
          },
        ],
      });

      res.status(200).json({
        data: myBookmark,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async addBookmark(req, res, next) {
    try {
      const { pairId } = req.params;

      const pair = await Pair.findByPk(pairId);

      if (!pair) throw { name: "PairNotFound" };

      const addToUser = await UserPair.create({
        UserId: req.user.id,
        PairId: pairId,
      });

      res.status(201).json({
        message: "Added to Bookmark",
      });
    } catch (err) {
      next(err);
    }
  }

  static async removeBookmark(req, res, next) {
    try {
      const { tableId } = req.params;

      const pairs = await UserPair.findByPk(tableId);

      if (!pairs) throw { name: "PairNotFound" };

      const deleted = await UserPair.destroy({
        where: {
          id: tableId,
        },
      });

      res.status(200).json({
        message: "Bookmark Removed",
      });
    } catch (err) {}
  }
}

module.exports = UserPairController;

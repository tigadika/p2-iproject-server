"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserPair extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserPair.belongsTo(models.Pair, { foreignKey: "PairId" });
      UserPair.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  UserPair.init(
    {
      UserId: DataTypes.INTEGER,
      PairId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserPair",
    }
  );
  return UserPair;
};

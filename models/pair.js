"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pair extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pair.belongsToMany(models.User, {
        through: "UserPairs",
        foreignKey: "PairId",
      });
      Pair.hasMany(models.Ticker, { foreignKey: "PairId" });
    }
  }
  Pair.init(
    {
      name: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Pair",
    }
  );
  return Pair;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticker.belongsTo(models.Pair, { foreignKey: "PairId" });
    }
  }
  Ticker.init(
    {
      high: DataTypes.INTEGER,
      low: DataTypes.INTEGER,
      vol_idr: DataTypes.STRING,
      last: DataTypes.INTEGER,
      buy: DataTypes.INTEGER,
      sell: DataTypes.INTEGER,
      server_time: DataTypes.INTEGER,
      PairId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Ticker",
    }
  );
  return Ticker;
};

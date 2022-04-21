"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tickers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      high: {
        type: Sequelize.INTEGER,
      },
      low: {
        type: Sequelize.INTEGER,
      },
      vol_idr: {
        type: Sequelize.STRING,
      },
      last: {
        type: Sequelize.INTEGER,
      },
      buy: {
        type: Sequelize.INTEGER,
      },
      sell: {
        type: Sequelize.INTEGER,
      },
      server_time: {
        type: Sequelize.INTEGER,
      },
      PairId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Pairs",
          },
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tickers");
  },
};

"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Recipe", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        notNull: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.TEXT,
      },
      time: {
        type: Sequelize.INTEGER,
      },
      ingredients: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      instructions: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "Users",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("Recipe");
  },
};

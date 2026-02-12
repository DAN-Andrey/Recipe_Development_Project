"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "user_id", as: "author" });
      this.belongsToMany(models.User, {
        through: models.Favorrites,
        foreignKey: "recipe_id",
        otherKey: "user_id",
        as: "favoriteBy",
      });
    }
  }
  Recipe.init(
    {
      title: DataTypes.TEXT,
      image: DataTypes.STRING,
      time: DataTypes.INTEGER,
      ingredients: DataTypes.TEXT,
      instructions: DataTypes.TEXT,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Recipe",
    },
  );
  return Recipe;
};

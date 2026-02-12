const recipeRouter = require("express").Router();
const RecipeController = require("../controllers/Recipe.controller");
const verifyAccessToken = require("../middleware/verifyAccessToken");

recipeRouter
  .get("/", RecipeController.getRecipe)
  .get("/:id", RecipeController.getOneRecipe)
  .post("/", verifyAccessToken, RecipeController.createRecipe)
  .put("/:id", RecipeController.updateRecipe)
  .delete("/:id", verifyAccessToken, RecipeController.deleteRecipe);

module.exports = recipeRouter;

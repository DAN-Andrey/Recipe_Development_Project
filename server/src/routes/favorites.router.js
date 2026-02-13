const favoritesRouter = require("express").Router();
const FavoritesController = require("../controllers/Favorites.controller");
const verifyAccessToken = require("../middleware/verifyAccessToken");

favoritesRouter
  .get("/", verifyAccessToken, FavoritesController.getFavorites)
  .get("/check/:recipeId", verifyAccessToken, FavoritesController.checkFavorite)
  .post("/", verifyAccessToken, FavoritesController.toggleFavorite);

module.exports = favoritesRouter;

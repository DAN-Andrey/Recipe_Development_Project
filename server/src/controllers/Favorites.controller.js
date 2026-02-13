const formatResponse = require("../utils/formatResponse");
const FavoritesService = require("../service/Favorites.service");

class FavoritesController {
  // Получить все избранные рецепты текущего пользователя
  static async getFavorites(req, res) {
    try {
      const { user } = res.locals;

      if (!user) {
        return res
          .status(401)
          .json(
            formatResponse(
              401,
              "Необходима авторизация",
              null,
              "Пользователь не авторизован",
            ),
          );
      }

      const favorites = await FavoritesService.getUserFavorites(user.id);

      res
        .status(200)
        .json(formatResponse(200, "Избранное получено", favorites, null));
    } catch (error) {
      console.log("==== FavoritesController.getFavorites ====");
      console.log(error);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
    }
  }

  // Проверить, находится ли рецепт в избранном у пользователя
  static async checkFavorite(req, res) {
    try {
      const { user } = res.locals;
      const { recipeId } = req.params;

      if (!user) {
        return res
          .status(401)
          .json(
            formatResponse(
              401,
              "Необходима авторизация",
              null,
              "Пользователь не авторизован",
            ),
          );
      }

      const isFavorite = await FavoritesService.checkFavorite(
        user.id,
        Number(recipeId),
      );

      res
        .status(200)
        .json(formatResponse(200, "Проверка выполнена", { isFavorite }, null));
    } catch (error) {
      console.log("==== FavoritesController.checkFavorite ====");
      console.log(error);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
    }
  }

  // Добавить или удалить рецепт из избранного (переключатель)
  static async toggleFavorite(req, res) {
    try {
      const { user } = res.locals;
      const { recipeId } = req.body;

      if (!user) {
        return res
          .status(401)
          .json(
            formatResponse(
              401,
              "Необходима авторизация",
              null,
              "Пользователь не авторизован",
            ),
          );
      }

      const result = await FavoritesService.toggleFavorite(
        user.id,
        Number(recipeId),
      );

      res
        .status(200)
        .json(
          formatResponse(
            200,
            result.message,
            { isFavorite: result.isFavorite },
            null,
          ),
        );
    } catch (error) {
      console.log("==== FavoritesController.toggleFavorite ====");
      console.log(error);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
    }
  }
}

module.exports = FavoritesController;

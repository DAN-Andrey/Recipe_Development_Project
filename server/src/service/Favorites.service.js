const { Favorrites, Recipe } = require("../db/models");

class FavoritesService {
  // Переключатель избранного: добавить/удалить
  static async toggleFavorite(userId, recipeId) {
    const existing = await Favorrites.findOne({
      where: { user_id: userId, recipe_id: recipeId },
    });

    if (existing) {
      await existing.destroy();
      return { isFavorite: false, message: "Рецепт удалён из избранного" };
    } else {
      await Favorrites.create({ user_id: userId, recipe_id: recipeId });
      return { isFavorite: true, message: "Рецепт добавлен в избранное" };
    }
  }

  // Получить все избранные рецепты пользователя
  static async getUserFavorites(userId) {
    const favorites = await Favorrites.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Recipe,
          as: "recipe",
          required: true,
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return favorites.map((fav) => fav.recipe);
  }

  // Проверить, есть ли рецепт в избранном
  static async checkFavorite(userId, recipeId) {
    const existing = await Favorrites.findOne({
      where: { user_id: userId, recipe_id: recipeId },
    });
    return !!existing;
  }
}

module.exports = FavoritesService;

const { Recipe } = require("../db/models");

// Сервис будет реализовывать набор CRUD-операций

class RecipeService {
  // Получаем все задачи
  static async getAllRecipes() {
    return await Recipe.findAll();
  }
  // Получаем одну задачу по ID
  static async getRecipeById(id) {
    return await Recipe.findByPk(id);
  }
  // Создаем новую задачу
  static async createNewRecipe(recipeData) {
    return await Recipe.create(recipeData);
  }

  // Удаляем задачу по ID
  static async deleteRecipeById(id, userId) {
    const recipeToDelete = await Recipe.findByPk(id);

    // Если такой задачи не существует, вернем null
    if (!recipeToDelete) return null;

    // Закрываем уязвимость IDOR - проверяем авторство задачи
    if (recipeToDelete.user_id !== userId) return null;

    return await recipeToDelete.destroy();
  }

  // Обновляем задачу по ID
  static async updateRecipeById(id, recipeData) {
    const recipeToUpdate = await Recipe.findByPk(id);

    const { title, image, time, ingredients, instructions } = recipeData;

    // Если такой задачи не существует, вернем null
    if (!recipeToUpdate) return null;

    // Точечно обновляем поля в объекте задачи
    if (title) {
      recipeToUpdate.title = title;
    }
    if (instructions) {
      recipeToUpdate.description = instructions;
    }
    if (image !== undefined) {
      recipeToUpdate.image = image;
    }
    if (time !== undefined) {
      recipeToUpdate.time = time;
    }
    if (ingredients) {
      recipeToUpdate.ingredients = ingredients;
    }

    // сохраняем изменения в БД
    await recipeToUpdate.save();

    return recipeToUpdate;
  }
}

module.exports = RecipeService;

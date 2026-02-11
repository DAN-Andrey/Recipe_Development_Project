//! пробная версия слияния

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
    const taskToDelete = await Recipe.findByPk(id);

    // Если такой задачи не существует, вернем null
    if (!taskToDelete) return null;

    // Закрываем уязвимость IDOR - проверяем авторство задачи
    if (taskToDelete.user_id !== userId) return null;

    return await taskToDelete.destroy();
  }

  // Обновляем задачу по ID
  static async updateTaskById(id, taskData) {
    const taskToUpdate = await Task.findByPk(id);

    const { title, text } = taskData;

    // Если такой задачи не существует, вернем null
    if (!taskToUpdate) return null;

    // Точечно обновляем поля в объекте задачи
    if (title) {
      taskToUpdate.title = title;
    }
    if (text) {
      taskToUpdate.text = text;
    }
    // сохраняем изменения в БД
    await taskToUpdate.save();

    return taskToUpdate;
  }
}

module.exports = TaskService;

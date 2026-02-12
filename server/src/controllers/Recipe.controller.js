const RecipeService = require("../service/Recipe.service");
const formatResponse = require("../utils/formatResponse");

class RecipeController {
  static async viewRecipesPage(req, res) {
    try {
      const rawRecipes = await RecipeService.getAllRecipes();

      if (rawRecipes.length === 0) {
        return res
          .status(200)
          .json(formatResponse(200, "В базе данных нет рецептов", [], null));
      }

      const recipes = rawRecipes.map((recipe) => recipe.get());

      res.send(`
        <div style="width: 50vw; margin: 0 auto;">
          <form
        action="/api/recipes"
        method="post"
        style="display: flex; flex-direction: column; gap: 10px"
      >
        <input type="text" name="title" placeholder="Название" />
        <input type="text" name="description" placeholder="Описание" />
        <button type="submit">Отправить</button>
      </form>
          ${recipes
            .map(
              (recipe) => `
            <div style="text-align: center; padding: 10px; margin: 15px 0; background-color: whitesmoke; border-radius: 8px; box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1)">
              <h2>${recipe.title}</h2>
              <p>${recipe.description}</p>
              ${recipe.image ? `<img src="${recipe.image}" alt="${recipe.title}" style="max-width: 300px;" />` : ""}
              <p>Время: ${recipe.cooking_time || "не указано"} мин | Ингредиентов: ${recipe.ingredients_count || "не указано"}</p>
            </div>
            `,
            )
            .join("")
            .replace(",", "")}
        </div>
        `);
    } catch (error) {
      console.log("==== RecipeController.viewRecipesPage ==== ");
      console.log(error);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
    }
  }

  static async getRecipes(req, res) {
    try {
      const recipes = await RecipeService.getAllRecipes();

      if (recipes.length === 0) {
        return res
          .status(200)
          .json(formatResponse(200, "В базе данных нет рецептов", [], null));
      }

      res
        .status(200)
        .json(formatResponse(200, "Данные о рецептах получены", recipes, null));
    } catch (error) {
      console.log("==== RecipeController.getRecipes ==== ");
      console.log(error);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
    }
  }

  static async getOneRecipe(req, res) {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Некорректный формат ID",
            null,
            "Некорректный формат ID",
          ),
        );
    }

    try {
      const recipe = await RecipeService.getRecipeById(Number(id));

      if (!recipe) {
        return res
          .status(404)
          .json(
            formatResponse(
              404,
              `Рецепт с ID: ${id} не найден`,
              null,
              `Рецепт с ID: ${id} не найден`,
            ),
          );
      }

      res
        .status(200)
        .json(formatResponse(200, "Данные о рецепте получены", recipe, null));
    } catch (error) {
      console.log("==== RecipeController.getOneRecipe ==== ");
      console.log(error);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
    }
  }

  static async createRecipe(req, res) {
    const { title, description, image, cooking_time, ingredients_count } =
      req.body;
    const { user } = res.locals;

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Название рецепта не должно быть пустым",
            null,
            "Название рецепта не должно быть пустым",
          ),
        );
    }

    if (
      !description ||
      typeof description !== "string" ||
      description.trim().length === 0
    ) {
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Описание рецепта не должно быть пустым",
            null,
            "Описание рецепта не должно быть пустым",
          ),
        );
    }

    try {
      const newRecipe = await RecipeService.createNewRecipe({
        title,
        description,
        image: image || null,
        cooking_time: cooking_time ? Number(cooking_time) : null,
        ingredients_count: ingredients_count ? Number(ingredients_count) : null,
        user_id: user.id,
      });

      res
        .status(201)
        .json(formatResponse(201, "Рецепт создан успешно", newRecipe, null));
    } catch (error) {
      console.log("==== RecipeController.createRecipe ==== ");
      console.log(error);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
    }
  }

  static async deleteRecipe(req, res) {
    const { id } = req.params;
    const { user } = res.locals;

    if (isNaN(Number(id))) {
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Некорректный формат ID",
            null,
            "Некорректный формат ID",
          ),
        );
    }

    try {
      const deletedRecipe = await RecipeService.deleteRecipeById(
        Number(id),
        user.id,
      );

      if (!deletedRecipe) {
        return res
          .status(404)
          .json(
            formatResponse(
              404,
              `Рецепт с ID: ${id} не найден`,
              null,
              `Рецепт с ID: ${id} не найден`,
            ),
          );
      }

      res.status(200).json(formatResponse(200, "Рецепт удалён успешно"));
    } catch (error) {
      console.log("==== RecipeController.deleteRecipe ==== ");
      console.log(error);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
    }
  }

  static async updateRecipe(req, res) {
    const { id } = req.params;
    const { title, description, image, cooking_time, ingredients_count } =
      req.body;

    if (isNaN(Number(id))) {
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Некорректный формат ID",
            null,
            "Некорректный формат ID",
          ),
        );
    }

    try {
      const updatedRecipe = await RecipeService.updateRecipeById(Number(id), {
        title,
        description,
        image,
        cooking_time,
        ingredients_count,
      });

      if (!updatedRecipe) {
        return res
          .status(404)
          .json(
            formatResponse(
              404,
              `Рецепт с ID: ${id} не найден`,
              null,
              `Рецепт с ID: ${id} не найден`,
            ),
          );
      }

      res
        .status(200)
        .json(formatResponse(200, "Рецепт обновлён успешно", updatedRecipe));
    } catch (error) {
      console.log("==== RecipeController.updateRecipe ==== ");
      console.log(error);
      res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
    }
  }
}

module.exports = RecipeController;

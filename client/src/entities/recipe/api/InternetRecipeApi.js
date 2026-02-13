// TheMealDB API - бесплатная, не требует ключ
export default class InternetRecipeApi {
  static async searchRecipes(query) {
    if (!query || query.trim().length === 0) {
      return [];
    }

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`,
      );
      const data = await response.json();

      // TheMealDB возвращает null если ничего не найдено, иначе массив meals
      if (data.meals === null) {
        return [];
      }

      // Трансформируем для совместимости с RecipeCard
      return (data.meals || []).map((meal) => ({
        id: meal.idMeal,
        title: meal.strMeal,
        image: meal.strMealThumb,
        ingredients: meal.strIngredient1
          ? [
              meal.strIngredient1,
              meal.strIngredient2,
              meal.strIngredient3,
              meal.strIngredient4,
              meal.strIngredient5,
              meal.strIngredient6,
              meal.strIngredient7,
              meal.strIngredient8,
              meal.strIngredient9,
              meal.strIngredient10,
            ].filter((i) => i && i.trim())
          : [],
        instructions: meal.strInstructions || "",
        time: null, // TheMealDB не предоставляет время приготовления
        user_id: null, // это рецепты из интернета, не от пользователя
        createdAt: new Date().toISOString(),
        fromInternet: true, // флаг для отличия от локальных рецептов
      }));
    } catch (error) {
      console.error("Error searching recipes:", error);
      return [];
    }
  }

  static async getRecipeDetails(mealId) {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch
?query=${mealId}`,
      );
      const data = await response.json();

      if (!data.meals || data.meals.length === 0) {
        return null;
      }

      const meal = data.meals[0];
      return {
        id: meal.idMeal,
        title: meal.strMeal,
        image: meal.strMealThumb,
        ingredients: meal.strIngredient1
          ? [
              meal.strIngredient1,
              meal.strIngredient2,
              meal.strIngredient3,
              meal.strIngredient4,
              meal.strIngredient5,
              meal.strIngredient6,
              meal.strIngredient7,
              meal.strIngredient8,
              meal.strIngredient9,
              meal.strIngredient10,
            ].filter((i) => i && i.trim())
          : [],
        instructions: meal.strInstructions || "",
      };
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      return null;
    }
  }
}

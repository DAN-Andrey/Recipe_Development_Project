import { axiosInstance } from "../../../shared/lib/axiosInstance";

export default class RecipeApi {
  static async getAllRecipes() {
    const response = await axiosInstance.get("/recipe");
    return {
      data: response.data.data,
      error: response.data.error,
      statusCode: response.data.status,
    };
  }

  static async getRecipeById(id) {
    const response = await axiosInstance.get(`/recipe/${id}`);
    return {
      data: response.data.data,
      error: response.data.error,
      statusCode: response.data.status,
    };
  }

  static async createRecipe(recipeData) {
    const response = await axiosInstance.post("/recipe", recipeData);
    return {
      data: response.data.data,
      error: response.data.error,
      statusCode: response.data.status,
    };
  }

  static async updateRecipe(id, recipeData) {
    const response = await axiosInstance.put(`/recipe/${id}`, recipeData);
    return {
      data: response.data.data,
      error: response.data.error,
      statusCode: response.data.status,
    };
  }

  static async deleteRecipe(id) {
    const response = await axiosInstance.delete(`/recipe/${id}`);
    return {
      data: response.data.data,
      error: response.data.error,
      statusCode: response.data.status,
    };
  }
}

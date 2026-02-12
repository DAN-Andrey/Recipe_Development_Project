import { axiosInstance } from "../../../shared/lib/axiosInstance";

export default class RecipeApi {
  static async getAllRecipe() {
    const response = await axiosInstance.get("/recipe");
    return response.data;
  }

  static async getRecipeById(id) {
    const response = await axiosInstance.get(`/recipe/${id}`);
    return response.data;
  }

  static async createRecipe(recipeData) {
    const response = await axiosInstance.post("/recipe", recipeData);
    return response.data;
  }

  static async updateRecipe(id, recipeData) {
    const response = await axiosInstance.put(`/recipe/${id}`, recipeData);
    return response.data;
  }

  static async deleteRecipe(id) {
    const response = await axiosInstance.delete(`/recipe/${id}`);
    return response.data;
  }
}

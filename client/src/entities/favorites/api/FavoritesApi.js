import { axiosInstance } from "../../../shared/lib/axiosInstance";

export default class FavoritesApi {
  static async checkFavorite(recipeId) {
    const response = await axiosInstance.get(`/favorites/check/${recipeId}`);
    return response.data;
  }

  static async addFavorite(recipeId) {
    const response = await axiosInstance.post("/favorites", { recipeId });
    return response.data;
  }

  static async removeFavorite(recipeId) {
    const response = await axiosInstance.delete(`/favorites/${recipeId}`);
    return response.data;
  }

  static async getFavorites() {
    const response = await axiosInstance.get("/favorites");
    return response.data;
  }
}

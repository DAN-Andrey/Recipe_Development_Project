import { useEffect, useState } from "react";
import "./FavoritesPage.css";
import RecipeCard from "../../entities/recipe/ui/RecipeCard/RecipeCard";
import FavoritesApi from "../../entities/favorites/api/FavoritesApi";

export default function FavoritesPage({ user }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { data } = await FavoritesApi.getFavorites();
        setFavorites(data || []);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchFavorites();
    }
  }, [user]);

  return (
    <div className="favorites-page">
      <h1 className="favorites-title">Избранное</h1>

      {favorites.length === 0 ? (
        <p className="favorites-empty">У вас пока нет избранных рецептов. 💔</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              recipes={favorites}
              setRecipes={setFavorites}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  );
}

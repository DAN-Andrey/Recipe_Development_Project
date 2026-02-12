import React, { useEffect, useState } from "react";
import "./MainPage.css";
import RecipeApi from "../../entities/recipe/api/RecipeApi";
import RecipeCard from "../../entities/recipe/ui/RecipeCard/RecipeCard";

export default function MainPage({ user }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function getRecipes() {
      const { data, error } = await RecipeApi.getAllRecipe();

      if (error) {
        alert(error);
        return;
      }
      setRecipes(data);
    }
    getRecipes();
  }, []);

  return (
    <div className="main-page">
      {/* Приветствие */}
      <p className="welcome-message">
        Добро пожаловать! {user?.name || "Гость"}
      </p>

      {/* Контейнер с карточками рецептов */}
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            setRecipes={setRecipes}
            recipes={recipes}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}

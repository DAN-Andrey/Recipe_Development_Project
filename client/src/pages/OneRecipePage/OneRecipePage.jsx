import "./OneRecipePage.css";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import RecipeApi from "../../entities/recipe/api/RecipeApi";

export default function OneRecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      const { data, error } = await RecipeApi.getRecipeById(id);
      setRecipe(data);
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <div className="app-container">Загрузка...</div>;

  return (
    <div className="recipe-page-container">
      {recipe.image && (
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      )}

      <h1 className="recipe-title">{recipe.title}</h1>

      <div className="recipe-meta">
        <span>⏱ {recipe.time || "—"} мин</span>
        <span>🥕 {recipe.ingredients || "—"} ингр.</span>
      </div>

      <div className="recipe-section">
        <h2>Ингредиенты</h2>
        <p>{recipe.ingredients || "Ингредиенты не указаны"}</p>
      </div>

      <div className="recipe-section">
        <h2>Приготовление</h2>
        <p>{recipe.instructions || "Инструкция отсутствует"}</p>
      </div>

      <button onClick={() => navigate(-1)} className="back-button">
        ← Назад
      </button>
    </div>
  );
}

import { useEffect, useState } from "react";
import "./MainPage.css";
import RecipeApi from "../../entities/recipe/api/RecipeApi";
import RecipeCard from "../../entities/recipe/ui/RecipeCard/RecipeCard";

export default function MainPage({ user }) {
  const [recipes, setRecipes] = useState([]);
  const [sortBy, setSortBy] = useState(null); // 'time' или 'ingredients'
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' или 'desc'

  // Загрузка всех рецептов
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data } = await RecipeApi.getAllRecipes();
        //  перемешиваем массив
        const shuffled = [...(data || [])].sort(() => Math.random() - 0.5);
        setRecipes(shuffled);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipes();
  }, []);

  // Сортировка
  const sortRecipes = (criteria) => {
    const newOrder =
      sortBy === criteria && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(criteria);
    setSortOrder(newOrder);

    const sorted = [...recipes].sort((a, b) => {
      const valA =
        criteria === "time"
          ? a.time || 0
          : a.ingredients?.split("\n").length || 0;
      const valB =
        criteria === "time"
          ? b.time || 0
          : b.ingredients?.split("\n").length || 0;

      return newOrder === "asc" ? valA - valB : valB - valA;
    });

    setRecipes(sorted);
  };

  return (
    <>
      <p className="welcome-message">Добро пожаловать!</p>

      <div className="app-container">
        <div className="sort-controls">
          <button
            className={`sort-button ${sortBy === "time" ? "active" : ""}`}
            onClick={() => sortRecipes("time")}
          >
            ⏰ Время {sortBy === "time" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
          <button
            className={`sort-button ${sortBy === "ingredients" ? "active" : ""}`}
            onClick={() => sortRecipes("ingredients")}
          >
            🥕 Ингредиенты{" "}
            {sortBy === "ingredients" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
        </div>

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
    </>
  );
}

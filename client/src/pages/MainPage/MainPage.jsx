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
        const response = await RecipeApi.getAllRecipes();
        console.log("=== RecipeApi Response ===");
        console.log("Full response:", response);
        console.log("Data:", response.data);
        console.log("Error:", response.error);

        const recipeData = response.data || [];
        console.log("Recipe array:", recipeData);
        console.log("Recipe count:", recipeData.length);

        //  перемешиваем массив
        const shuffled = [...recipeData].sort(() => Math.random() - 0.5);
        console.log("Shuffled:", shuffled);

        setRecipes(shuffled);
      } catch (error) {
        console.error("=== Error fetching recipes ===", error);
      }
    };
    fetchRecipes();
  }, []);

  // Сортировка
  const sortRecipes = (criteria) => {
    console.log("=== sortRecipes called ===");
    console.log("criteria:", criteria);
    console.log("sortBy:", sortBy);
    console.log("sortOrder:", sortOrder);

    const newOrder =
      sortBy === criteria && sortOrder === "asc" ? "desc" : "asc";
    console.log("newOrder:", newOrder);

    setSortBy(criteria);
    setSortOrder(newOrder);

    const sorted = [...recipes].sort((a, b) => {
      const valA =
        criteria === "time" ? a.time || 0 : a.ingredients?.length || 0;
      const valB =
        criteria === "time" ? b.time || 0 : b.ingredients?.length || 0;

      console.log(`Сравнение: ${a.title}(${valA}) vs ${b.title}(${valB})`);

      return newOrder === "asc" ? valA - valB : valB - valA;
    });

    console.log("Sorted array:", sorted);
    setRecipes(sorted);
  };

  return (
    <>
      <p className="welcome-message">
        Добро пожаловать, {user?.username || "Гость"}!
      </p>

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

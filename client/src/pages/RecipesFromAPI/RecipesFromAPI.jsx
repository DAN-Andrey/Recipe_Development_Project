import React, { useState, useRef, useEffect } from "react";
import "./RecipesFromAPI.css";
import InternetRecipeApi from "../../entities/recipe/api/InternetRecipeApi";
import RecipeCard from "../../entities/recipe/ui/RecipeCard/RecipeCard";

export default function RecipesFromAPI({ user }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const debounceTimer = useRef(null);

  // Функция поиска с debounce
  const handleSearch = (query) => {
    setSearchQuery(query);
    setError(null);

    // Очищаем предыдущий таймер
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Если поле пусто, очищаем результаты
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    // Запускаем поиск через 500ms после последнего ввода
    debounceTimer.current = setTimeout(async () => {
      console.log("🔍 Начинаю поиск для:", query);
      setLoading(true);
      setHasSearched(true);

      try {
        const recipes = await InternetRecipeApi.searchRecipes(query);
        console.log("✅ Результаты поиска:", recipes);
        setResults(recipes);
        if (recipes.length === 0) {
          console.warn("⚠️ Рецепты не найдены");
          setError("Рецепты не найдены. Попробуйте другое название.");
        }
      } catch (err) {
        console.error("❌ Search error:", err);
        setError("Ошибка при поиске. Попробуйте позже.");
      } finally {
        setLoading(false);
      }
    }, 500); // debounce delay
  };

  // Очистка таймера при размонтировании
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <div className="api-recipes-page">
      <h1>Поиск рецептов из интернета</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Введите название блюда (например: pizza, chicken)..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {loading && (
        <div className="loading-spinner">
          <p>⏳ Загружаю рецепты...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>⚠️ {error}</p>
        </div>
      )}

      {hasSearched && !loading && results.length > 0 && (
        <div className="results-info">
          <p>
            Найдено рецептов: <strong>{results.length}</strong>
          </p>
        </div>
      )}

      {results.length > 0 && (
        <div className="recipes-grid">
          {results.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              user={user}
              setRecipes={setResults}
              recipes={results}
              onDelete={(id) => {
                setResults((prev) => prev.filter((r) => r.id !== id));
              }}
            />
          ))}
        </div>
      )}

      {hasSearched && !loading && results.length === 0 && !error && (
        <div className="no-results">
          <p>🔍 Ничего не найдено</p>
        </div>
      )}

      {!hasSearched && results.length === 0 && (
        <div className="empty-state">
          <p>📖 Введите название блюда для поиска</p>
          <p className="hint">Примеры: pizza, pasta, chicken, burger...</p>
        </div>
      )}
    </div>
  );
}

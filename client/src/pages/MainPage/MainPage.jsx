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

  const initialFormState = {
    title: "",
    image: "",
    time: "",
    ingredients: "",
    instructions: "",
  };

  const [newRecipe, setNewRecipe] = useState(initialFormState);

  function inputChangeHandler(event) {
    const { name, value } = event.target;
    setNewRecipe((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function addNewRecipe(event) {
    event.preventDefault();

    const { data, error } = await RecipeApi.createRecipe(newRecipe);
    setRecipes((current) => [...current, data]);

    setNewRecipe(initialFormState);
  }

  async function deleteRecipe(id) {
    const response = await RecipeApi.deleteRecipe(id);

    setRecipes((current) => current.filter((recipe) => recipe.id !== id));
  }

  return (
    <>
      <p className="welcome-message">Добро пожаловать!</p>
      <div className="app-container">
        <form onSubmit={addNewRecipe}>
          <input
            type="text"
            name="title"
            placeholder="Название рецепта"
            onChange={inputChangeHandler}
            value={newRecipe.title}
          />
          <input
            type="text"
            name="image"
            placeholder="URL изображения"
            onChange={inputChangeHandler}
            value={newRecipe.image}
          />
          <input
            type="number"
            name="time"
            placeholder="Время готовки (мин)"
            onChange={inputChangeHandler}
            value={newRecipe.time}
          />
          <input
            type="text"
            name="ingredients"
            placeholder="Ингредиенты"
            onChange={inputChangeHandler}
            value={newRecipe.ingredients}
          />
          <input
            type="text"
            name="instructions"
            placeholder="Инструкции"
            onChange={inputChangeHandler}
            value={newRecipe.instructions}
          />
          <button>Создать</button>
        </form>
        <div className="todo-container">
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

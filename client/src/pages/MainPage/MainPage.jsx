import React, { useEffect, useState } from 'react';
import './MainPage.css';
import RecipeApi from '../../entities/recipe/api/RecipeApi';
export default function MainPage({ user }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function getRecipes() {
      const { data, error } = await RecipeApi.getAllRecipes();

      if (error) {
        alert(error);
        return;
      }
      setRecipes(data);
    }
    getRecipes();
  }, []);

  const initialFormState = { title: '', text: '' };

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
    <div className="app-container">
      <form onSubmit={addNewRecipe}>
        <input
          type="text"
          name="title"
          placeholder="Название задачи"
          onChange={inputChangeHandler}
          value={newRecipe.title}
        />
        <input
          type="text"
          name="text"
          placeholder="Описание задачи"
          onChange={inputChangeHandler}
          value={newRecipe.text}
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
  );
}

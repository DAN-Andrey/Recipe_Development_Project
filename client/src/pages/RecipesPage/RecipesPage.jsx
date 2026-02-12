import { useEffect, useState } from "react";
import "./RecipesPage.css";
import RecipeCard from "../../entities/recipe/ui/RecipeCard/RecipeCard";
import RecipeApi from "../../entities/recipe/api/RecipeApi";

export default function RecipesPage({ user }) {
  const [recipes, setRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // 'all' или 'my'

  // useEffect(() => {}, []) - в таком варианте callback выполнится  один раз при монтировании компонента

  // useEffect(() => {}) - в таком варианте callback будет выполняться каждый раз при любом изменении компонента

  // useEffect(() => {}, [state]) - в таком варианте callback выполнится каждый раз при изменении элемента, указанного в массиве зависимостей

  // useEffect(() => {
  //  return () => {}}, []) - в таком варианте мыожно выполнить определнную логику при размонтировании компонента (возвращаем функцию очистки \ cleanup function)

  const initialFormState = {
    title: "",
    description: "",
    image: "",
    cooking_time: "",
    ingredients_count: "",
  };

  const [newRecipe, setNewRecipe] = useState(initialFormState);

  useEffect(() => {
    if (activeTab === "all") {
      getRecipes();
    } else if (activeTab === "my" && user) {
      getMyRecipes();
    }
  }, [activeTab, user]);

  async function getRecipes() {
    const { data, error } = await RecipeApi.getAllRecipes();
    if (!error) setRecipes(data || []);
  }

  async function getMyRecipes() {
    const { data, error } = await RecipeApi.getMyRecipes();
    if (!error) setRecipes(data || []);
  }

  function inputChangeHandler(event) {
    const { name, value } = event.target;
    setNewRecipe((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function addNewRecipe(event) {
    event.preventDefault();

    const recipeData = {
      ...newRecipe,
      cooking_time: newRecipe.cooking_time
        ? Number(newRecipe.cooking_time)
        : null,
      ingredients_count: newRecipe.ingredients_count
        ? Number(newRecipe.ingredients_count)
        : null,
    };

    const { data, error } = await RecipeApi.createRecipe(recipeData);

    if (!error) {
      setRecipes((current) => [...current, data]);
      setNewRecipe(initialFormState);
      setActiveTab("my"); // после создания показываем мои рецепты
    }
  }

  async function deleteRecipe(id) {
    const { error } = await RecipeApi.deleteRecipe(id);
    if (!error) {
      setRecipes((current) => current.filter((recipe) => recipe.id !== id));
    }
  }

  return (
    <div className="app-container">
      <div className="recipes-tabs">
        <button
          className={activeTab === "all" ? "active" : ""}
          onClick={() => setActiveTab("all")}
        >
          Все рецепты
        </button>
        {user && (
          <button
            className={activeTab === "my" ? "active" : ""}
            onClick={() => setActiveTab("my")}
          >
            Мои рецепты
          </button>
        )}
      </div>

      {user && activeTab === "my" && (
        <form onSubmit={addNewRecipe} className="recipe-form">
          <input
            type="text"
            name="title"
            placeholder="Название блюда"
            onChange={inputChangeHandler}
            value={newRecipe.title}
            required
          />
          <textarea
            name="description"
            placeholder="Рецепт приготовления"
            onChange={inputChangeHandler}
            value={newRecipe.description}
            rows={3}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Ссылка на фото"
            onChange={inputChangeHandler}
            value={newRecipe.image}
          />
          <input
            type="number"
            name="cooking_time"
            placeholder="Время приготовления (мин)"
            onChange={inputChangeHandler}
            value={newRecipe.cooking_time}
          />
          <input
            type="number"
            name="ingredients_count"
            placeholder="Количество ингредиентов"
            onChange={inputChangeHandler}
            value={newRecipe.ingredients_count}
          />
          <button type="submit">Добавить рецепт</button>
        </form>
      )}

      <div className="recipes-container">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            setRecipes={setRecipes}
            recipes={recipes}
            user={user}
            onDelete={deleteRecipe}
          />
        ))}
        {recipes.length === 0 && (
          <p className="no-recipes">Рецептов пока нет</p>
        )}
      </div>
    </div>
  );
}

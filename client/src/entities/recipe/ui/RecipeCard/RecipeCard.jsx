import { useState } from "react";
import { useNavigate } from "react-router";
import "./RecipeCard.css";
import { Trash, Pencil, ChevronRight, X, Check, Bot } from "lucide-react";
import { CLIENT_ROUTES } from "../../../../shared/consts/clientRoutes";
import RecipeApi from "../../api/RecipeApi";
import AiApi from "../../../../features/ai/api/AiApi";

export default function RecipeCard({ recipe, recipes, setRecipes, user }) {
  const navigate = useNavigate();

  const [plan, setPlan] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [editedRecipe, setEditedRecipe] = useState({
    title: recipe.title,
    text: recipe.text,
    time: recipe.time,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
  });

  const inputHandler = (event) => {
    setEditedRecipe((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const generatePlan = async () => {
    const { statusCode, data } = await AiApi.generateText({
      title: recipe.title,
      text: recipe.text,
      time: recipe.time,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
    });
    if (statusCode === 200) {
      setPlan(data);
    }
  };

  const updateRecipe = async (id) => {
    const { statusCode, data } = await RecipeApi.updateRecipe(id, editedRecipe);

    if (statusCode === 200) {
      setRecipes(recipes.map((recipe) => (recipe.id === id ? data : recipe)));
      setIsEditing(false);
      setEditedRecipe({
        title: recipe.title,
        text: recipe.text,
        time: recipe.time,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
      });
    }
  };

  const deleteRecipe = async (id) => {
    const { statusCode } = await RecipeApi.deleteRecipe(id);

    if (statusCode === 200) {
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    }
  };

  return (
    <div className="recipe">
      <div className="recipe-title">
        {isEditing ? (
          <input
            type="text"
            name="title"
            className="recipe-title-input"
            value={editedRecipe.title}
            onChange={inputHandler}
          />
        ) : (
          <h2 className="recipe-name">{recipe.title}</h2>
        )}
        <small>
          Добавлено: {new Date(recipe.createdAt).toLocaleString("ru-RU")}
        </small>
      </div>

      <div className="recipe-content">
        {isEditing ? (
          <textarea
            rows={2}
            cols={55}
            name="text"
            className="recipe-text-input"
            value={editedRecipe.text}
            onChange={inputHandler}
          />
        ) : (
          <p className="recipe-text">{recipe.text}</p>
        )}

        <div className="recipe-controls">
          {user?.id === recipe.user_id &&
            (isEditing ? (
              <>
                <button
                  className="recipe-control-button save-recipe-button"
                  title="Сохранить"
                  onClick={() => updateRecipe(recipe.id)}
                >
                  <Check color="white" />
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedRecipe(recipe);
                  }}
                  className="recipe-control-button delete-recipe-button"
                  title="Отменить"
                >
                  <X color="white" />
                </button>
              </>
            ) : (
              <>
                <button
                  className="edit-recipe-button recipe-control-button"
                  title="Редактировать"
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil color="white" />
                </button>
                <button
                  className="delete-recipe-button recipe-control-button"
                  onClick={() => deleteRecipe(recipe.id)}
                  title="Удалить"
                >
                  <Trash color="white" />
                </button>
              </>
            ))}
          <button
            className="recipe-control-button ai-button"
            onClick={generatePlan}
            title="Генерировать план выполнения задачи"
          >
            <Bot color="black" />
          </button>

          <button
            className="recipe-control-button details-button"
            onClick={() => navigate(`${CLIENT_ROUTES.RECIPES}/${recipe.id}`)}
            title="Подробнее"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      {plan && (
        <div className="plan">
          <h3>План выполнения задачи</h3>
          <p>{plan}</p>
        </div>
      )}
    </div>
  );
}

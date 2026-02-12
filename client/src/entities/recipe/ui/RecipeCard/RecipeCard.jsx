import { useNavigate } from "react-router";
import "./RecipeCard.css";
import { ChevronRight } from "lucide-react";
import { CLIENT_ROUTES } from "../../../../shared/consts/clientRoutes";

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  return (
    <div className="recipe-card">
      {/* Шапка карточки с заголовком и датой */}
      <div className="recipe-card__header">
        <h3 className="recipe-card__title">{recipe.title}</h3>
        <span className="recipe-card__date">
          {new Date(recipe.createdAt).toLocaleString("ru-RU")}
        </span>
      </div>

      <div className="recipe-card__content">
        <div className="recipe-card__image-wrapper">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="recipe-card__image"
          />
        </div>

        {/* Блок с ингредиентами и временем (добавляем для единообразия) */}
        {(recipe.ingredients || recipe.time) && (
          <div className="recipe-card__meta">
            {recipe.ingredients && (
              <span className="recipe-card__ingredients">
                {recipe.ingredients.length} ингр.
              </span>
            )}
            {recipe.time && (
              <span className="recipe-card__time">{recipe.time} мин</span>
            )}
          </div>
        )}

        {/* Панель управления */}
        <div className="recipe-card__actions">
          <button
            className="recipe-card__button recipe-card__button--details"
            onClick={() => navigate(`${CLIENT_ROUTES.TASKS}/${recipe.id}`)}
            title="Подробнее"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

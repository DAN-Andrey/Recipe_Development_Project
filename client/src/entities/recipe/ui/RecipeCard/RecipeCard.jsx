import { useNavigate } from "react-router";
import "./RecipeCard.css";
import { ChevronRight, Heart } from "lucide-react";
import FavoritesApi from "../../../../entities/favorites/api/FavoritesApi";
import { useEffect, useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { CLIENT_ROUTES } from "../../../../shared/consts/clientRoutes";

export default function RecipeCard({
  recipe,
  user,
  setRecipes,
  recipes,
  onDelete,
}) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(!!recipe.isFavorite);

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      if (!user) return;
      try {
        const { data } = await FavoritesApi.checkFavorite(recipe.id);
        if (mounted) setIsFavorite(Boolean(data.isFavorite));
      } catch (err) {
        console.error("checkFavorite error", err);
      }
    };
    check();
    return () => {
      mounted = false;
    };
  }, [recipe.id, user]);

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
          {user && (
            <>
              <button
                className={`recipe-card__button recipe-card__button--fav ${isFavorite ? "active" : ""}`}
                onClick={async () => {
                  if (!user) return;
                  const prev = isFavorite;
                  // optimistic
                  setIsFavorite(!prev);
                  try {
                    // server uses toggle endpoint for favorites
                    await FavoritesApi.addFavorite(recipe.id);
                    // update parent list if provided
                    if (setRecipes && recipes) {
                      setRecipes(
                        recipes.map((r) =>
                          r.id === recipe.id ? { ...r, isFavorite: !prev } : r,
                        ),
                      );
                    }
                  } catch (err) {
                    console.error(err);
                    setIsFavorite(prev); // rollback
                  }
                }}
                title={isFavorite ? "Убрать из избранного" : "В избранное"}
              >
                <Heart fill={isFavorite ? "red" : "none"} color="red" />
              </button>

              {/* Edit/Delete visible only for author */}
              {user?.id === recipe.user_id && (
                <>
                  <button
                    className="recipe-card__button recipe-card__button--edit"
                    onClick={() =>
                      navigate(`${CLIENT_ROUTES.RECIPES}/${recipe.id}`)
                    }
                    title="Редактировать"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="recipe-card__button recipe-card__button--delete"
                    onClick={async () => {
                      if (!window.confirm("Удалить рецепт?")) return;
                      try {
                        if (onDelete) {
                          await onDelete(recipe.id);
                        } else {
                          await RecipeApi.deleteRecipe(recipe.id);
                          if (setRecipes && recipes) {
                            setRecipes(
                              recipes.filter((r) => r.id !== recipe.id),
                            );
                          }
                        }
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    title="Удалить"
                  >
                    <Trash size={16} />
                  </button>
                </>
              )}
            </>
          )}

          <button
            className="recipe-card__button recipe-card__button--details"
            onClick={() => navigate(`${CLIENT_ROUTES.RECIPES}/${recipe.id}`)}
            title="Подробнее"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

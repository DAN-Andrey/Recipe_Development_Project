import "./OneRecipePage.css";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Heart, Pencil, Trash, Check, X } from "lucide-react";
import RecipeApi from "../../entities/recipe/api/RecipeApi";
import FavoritesApi from "../../entities/favorites/api/FavoritesApi";

export default function OneRecipePage({ user }) {
  //ХУКИ РОУТИНГА
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null); // Данные рецепта
  const [isEditing, setIsEditing] = useState(false); // Режим редактирования
  const [isFavorite, setIsFavorite] = useState(false); // В избранном?
  const [editedRecipe, setEditedRecipe] = useState({}); // Изменяемые данные

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // 1. Загружаем рецепт по ID
        const { data } = await RecipeApi.getRecipeById(id);
        setRecipe(data);
        setEditedRecipe(data);

        if (user) {
          // 2. Если пользователь авторизован — проверяем, в избранном ли рецеп
          const { data: favData } = await FavoritesApi.checkFavorite(id);
          setIsFavorite(favData.isFavorite);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipe();
  }, [id, user]); // Перезапускаем при смене ID или пользователя

  // УСЛОВНЫЙ РЕНДЕРИНГ: ПОКАЗЫВАЕМ ЗАГРУЗКУ
  if (!recipe) return <div className="app-container">Загрузка...</div>;

  const isAuthor = user?.id === recipe.user_id; //проверка авторства

  //ОБРАБОТЧИКИ СОБЫТИЙ
  const handleInputChange = (e) => {
    //изменение полей формы редактирования
    setEditedRecipe((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    //обновление рецепта (онли фо автор)
    if (!isAuthor) {
      alert("Вы не можете редактировать чужой рецепт");
      return;
    }

    try {
      const { data } = await RecipeApi.updateRecipe(recipe.id, editedRecipe);
      setRecipe(data); //обновляю олтображаемые данные
      setEditedRecipe(data); //синхронизирую форму
      setIsEditing(false); //выход из режима редактирования
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    //удаление рецепта (токмо автор)
    if (!window.confirm("Удалить рецепт?")) return;

    try {
      await RecipeApi.deleteRecipe(recipe.id);
      navigate("/recipes"); //возврат к спискку рецептов
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditCopy = async () => {
    //сотворение копии чужого рецепта (рождается новый автор (копии))
    const copyData = {
      title: recipe.title,
      image: recipe.image,
      time: recipe.time,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
    };

    try {
      const { data } = await RecipeApi.createRecipe(copyData);
      navigate(`/recipes/${data.id}`); //переход к сотворённой копии
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      alert("Авторизуйтесь, чтобы добавлять в избранное");
      return;
    }

    try {
      if (isFavorite) {
        await FavoritesApi.removeFavorite(recipe.id);
        setIsFavorite(false);
      } else {
        await FavoritesApi.addFavorite(recipe.id);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    //JSX НАЧИНАЕЦЦО
    <div className="recipe-page-container">
      {/* ФОТО И КНОПКА ИЗБРАННОГО */}
      <div className="recipe-header">
        {recipe.image && (
          <img src={recipe.image} alt={recipe.title} className="recipe-image" />
        )}

        {user && (
          <button
            className={`favorite-button ${isFavorite ? "active" : ""}`}
            onClick={toggleFavorite}
          >
            <Heart fill={isFavorite ? "red" : "none"} color="red" />
          </button>
        )}
      </div>

      {/* НАЗВАНИЕ И МЕТА-ИНФА */}
      <div className="recipe-title-section">
        {isEditing ? (
          <input
            type="text"
            name="title"
            className="recipe-title-input"
            value={editedRecipe.title || ""}
            onChange={handleInputChange}
          />
        ) : (
          <h1 className="recipe-title">{recipe.title}</h1>
        )}

        <div className="recipe-meta">
          <span>
            🥕{" "}
            {recipe.ingredients ? recipe.ingredients.split("\n").length : "—"}{" "}
            ингр.
          </span>
          <span>⏱ {recipe.time || "—"} мин</span>
        </div>
      </div>

      {/* ИНГРЕДИЕНТЫ СОБСНА */}
      <div className="recipe-section">
        <h2>Ингредиенты</h2>
        {isEditing ? (
          <textarea
            name="ingredients"
            className="recipe-textarea"
            value={editedRecipe.ingredients || ""}
            onChange={handleInputChange}
            rows={6}
          />
        ) : (
          <div className="ingredients-list">
            {recipe.ingredients?.split("\n").map((item, i) => (
              <div key={i} className="ingredient-item">
                • {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ИНСТРУКЦИЯ ПО ПРИГОТОВЛЕНИЮ */}
      <div className="recipe-section">
        <h2>Приготовление</h2>
        {isEditing ? (
          <textarea
            name="instructions"
            className="recipe-textarea"
            value={editedRecipe.instructions || ""}
            onChange={handleInputChange}
            rows={10}
          />
        ) : (
          <div className="instructions-text">
            {recipe.instructions?.split("\n").map((step, i) => (
              <p key={i}>{step}</p>
            ))}
          </div>
        )}
      </div>

      {/* ПАНЕЛЬ УПРАВЛЕНИЯ (БАТТОНЫ) */}
      <div className="recipe-actions">
        {/* ежели автор */}
        {isAuthor ? (
          isEditing ? ( //то режим редактирования
            <>
              <button className="save-button" onClick={handleUpdate}>
                <Check size={18} /> Сохранить
              </button>
              <button
                className="cancel-button"
                onClick={() => {
                  setIsEditing(false);
                  setEditedRecipe(recipe);
                }}
              >
                <X size={18} /> Отмена
              </button>
            </>
          ) : (
            //просмотр (автор)
            <>
              <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                <Pencil size={18} /> Редактировать
              </button>
              <button className="delete-button" onClick={handleDelete}>
                <Trash size={18} /> Удалить
              </button>
            </>
          )
        ) : user ? ( //ежели юзер - НЕ автор
          <button className="copy-button" onClick={handleEditCopy}>
            <Pencil size={18} /> Редактировать (создать копию)
          </button>
        ) : null}

        {/* всегда можно сбежать (кнопка баттон всегда доступна) */}
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Назад
        </button>
      </div>
    </div>
  );
}

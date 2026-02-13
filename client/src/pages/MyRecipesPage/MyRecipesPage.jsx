import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./MyRecipesPage.css";
import RecipeCard from "../../entities/recipe/ui/RecipeCard/RecipeCard";
import RecipeApi from "../../entities/recipe/api/RecipeApi";
import { CLIENT_ROUTES } from "../../shared/consts/clientRoutes";

export default function MyRecipesPage({ user }) {
  const navigate = useNavigate();
  const [myRecipes, setMyRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    time: "",
    image: "",
    ingredients: "",
    instructions: "",
  });

  // Загрузка рецептов пользователя при монтировании
  useEffect(() => {
    if (!user) {
      navigate(CLIENT_ROUTES.MAIN_PAGE);
      return;
    }

    const fetchMyRecipes = async () => {
      try {
        const { data } = await RecipeApi.getAllRecipes();
        // Фильтруем только рецепты текущего пользователя
        const userRecipes = data.filter((recipe) => recipe.user_id === user.id);
        setMyRecipes(userRecipes);
      } catch (error) {
        console.error("Ошибка при загрузке рецептов:", error);
      }
    };

    fetchMyRecipes();
  }, [user, navigate]);

  // Обработчик изменения полей формы
  const handleInputChange = (e) => {
    setNewRecipe({
      ...newRecipe,
      [e.target.name]: e.target.value,
    });
  };

  // Обработчик создания нового рецепта
  const handleCreateRecipe = async (e) => {
    e.preventDefault();

    try {
      const { data } = await RecipeApi.createRecipe({
        ...newRecipe,
        user_id: user.id,
      });

      // Добавляем новый рецепт в список
      setMyRecipes([...myRecipes, data]);

      // Закрываем модалку и сбрасываем форму
      setIsModalOpen(false);
      setNewRecipe({
        title: "",
        time: "",
        image: "",
        ingredients: "",
        instructions: "",
      });
    } catch (error) {
      console.error("Ошибка при создании рецепта:", error);
    }
  };

  // Закрытие модалки по клику на оверлей
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className="my-recipes-page">
        {/* Кнопка создания рецепта */}
        <div className="create-recipe-container">
          <button
            className="create-recipe-button"
            onClick={() => setIsModalOpen(true)}
          >
            + Создать рецепт
          </button>
        </div>

        {/* Модальное окно создания рецепта */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
              <h2 className="modal-title">Создать новый рецепт</h2>
              <form
                onSubmit={handleCreateRecipe}
                className="create-recipe-form"
              >
                <div className="form-fields-vertical">
                  <input
                    type="text"
                    name="title"
                    placeholder="Название блюда"
                    value={newRecipe.title}
                    onChange={handleInputChange}
                    className="modal-input"
                    required
                  />
                  <input
                    type="number"
                    name="time"
                    placeholder="Время приготовления (в минутах)"
                    value={newRecipe.time}
                    onChange={handleInputChange}
                    className="modal-input"
                  />
                  <input
                    type="url"
                    name="image"
                    placeholder="Ссылка на фото"
                    value={newRecipe.image}
                    onChange={handleInputChange}
                    className="modal-input"
                  />
                  <textarea
                    name="ingredients"
                    placeholder="Ингредиенты (каждый с новой строки)"
                    value={newRecipe.ingredients}
                    onChange={handleInputChange}
                    className="modal-textarea"
                    rows={4}
                  />
                  <textarea
                    name="instructions"
                    placeholder="Инструкция приготовления (каждый шаг с новой строки)"
                    value={newRecipe.instructions}
                    onChange={handleInputChange}
                    className="modal-textarea"
                    rows={6}
                  />
                </div>
                <div className="modal-actions">
                  <button type="submit" className="modal-button create">
                    Создать
                  </button>
                  <button
                    type="button"
                    className="modal-button cancel"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Сетка рецептов */}
        {myRecipes.length > 0 ? (
          <div className="recipes-grid">
            {myRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                setRecipes={setMyRecipes}
                recipes={myRecipes}
                user={user}
              />
            ))}
          </div>
        ) : (
          <div className="no-recipes-message">
            <p>У вас пока нет рецептов. Создайте свой первый рецепт!</p>
          </div>
        )}
      </div>
    </>
  );
}

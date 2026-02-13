import { Routes, Route } from "react-router";
import Layout from "../Layout/Layout";
import {
  MainPage,
  RecipesPage,
  OneRecipePage,
  AuthPage,
  FavoritesPage,
  MyRecipesPage,
  RecipesFromAPI,
} from "../../pages";
import { CLIENT_ROUTES } from "../../shared/consts/clientRoutes";

export default function AppRouter({ setUser, user }) {
  return (
    <Routes>
      <Route path="/" element={<Layout user={user} setUser={setUser} />}>
        <Route index path={CLIENT_ROUTES.MAIN_PAGE} element={<MainPage />} />
        <Route
          path={CLIENT_ROUTES.RECIPES}
          element={<RecipesPage user={user} />}
        />
        <Route
          path={`${CLIENT_ROUTES.RECIPES}/:id`}
          element={<OneRecipePage user={user} />}
        />
        <Route
          path={CLIENT_ROUTES.AUTH}
          element={<AuthPage setUser={setUser} />}
        />
        <Route
          path={CLIENT_ROUTES.FAVORITES}
          element={<FavoritesPage user={user} />}
        />
        <Route
          path={CLIENT_ROUTES.MY_RECIPES}
          element={<MyRecipesPage user={user} />}
        />
        <Route
          path="/recipes-from-api"
          element={<RecipesFromAPI user={user} />}
        />
      </Route>
    </Routes>
  );
}

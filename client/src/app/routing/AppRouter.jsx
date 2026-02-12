import { Routes, Route } from 'react-router';
import Layout from '../Layout/Layout';
import {
  MainPage,
  RecipesPage,
  OneRecipePage,
  AuthPage,
} from '../../pages';
import { CLIENT_ROUTES } from '../../shared/consts/clientRoutes';

export default function AppRouter({ setUser, user }) {
  return (
    <Routes>
      <Route path="/" element={<Layout user={user} setUser={setUser} />}>
        <Route index path={CLIENT_ROUTES.MAIN_PAGE} element={<MainPage />} />
        <Route path={CLIENT_ROUTES.TASKS} element={<RecipesPage user={user} />} />
        <Route path={CLIENT_ROUTES.TASKS + '/:id'} element={<OneRecipePage />} />
        <Route
          path={CLIENT_ROUTES.AUTH}
          element={<AuthPage setUser={setUser} />}
        />
      </Route>
    </Routes>
  );
}

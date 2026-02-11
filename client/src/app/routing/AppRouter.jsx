import { Routes, Route } from 'react-router';
import Layout from '../Layout/Layout';
import {
  MainPage,
  CounterPage,
  TasksPage,
  TimerPage,
  OneTaskPage,
  AuthPage,
} from '../../pages';
import { CLIENT_ROUTES } from '../../shared/consts/clientRoutes';

export default function AppRouter({ setUser, user }) {
  return (
    <Routes>
      <Route path="/" element={<Layout user={user} setUser={setUser} />}>
        <Route index path={CLIENT_ROUTES.MAIN_PAGE} element={<MainPage />} />
        <Route path={CLIENT_ROUTES.TIMER} element={<TimerPage />} />
        <Route path={CLIENT_ROUTES.TASKS} element={<TasksPage user={user} />} />
        <Route path={CLIENT_ROUTES.COUNTER} element={<CounterPage />} />
        <Route path={CLIENT_ROUTES.TASKS + '/:id'} element={<OneTaskPage />} />
        <Route
          path={CLIENT_ROUTES.AUTH}
          element={<AuthPage setUser={setUser} />}
        />
      </Route>
    </Routes>
  );
}

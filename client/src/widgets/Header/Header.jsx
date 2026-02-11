import { NavLink, Link } from 'react-router';
import './Header.css';
import UserApi from '../../entities/user/api/UserApi';
import { setAccessToken } from '../../shared/lib/axiosInstance';

export default function Header({ user, setUser }) {
  async function handleSignOut() {
    await UserApi.signOut();
    setAccessToken('');
    setUser(null);
  }
  return (
    <header>
      <nav>
        <NavLink to="/" className="navlink">
          Главная
        </NavLink>
        <NavLink to="/tasks" className="navlink">
          Задачи
        </NavLink>
        <NavLink to="/counter" className="navlink">
          Счетчики
        </NavLink>
        <NavLink to="/timer" className="navlink">
          Таймер
        </NavLink>
        {user ? (
          <>
            <p>{user.username}</p>
            <NavLink to="/auth" className="navlink" onClick={handleSignOut}>
              Выход
            </NavLink>
          </>
        ) : (
          <NavLink to="/auth" className="navlink">
            Вход
          </NavLink>
        )}
      </nav>
    </header>
  );
}

import { NavLink, Link } from "react-router";
import "./Header.css";
import UserApi from "../../entities/user/api/UserApi";
import { setAccessToken } from "../../shared/lib/axiosInstance";
import { CLIENT_ROUTES } from "../../shared/consts/clientRoutes";

export default function Header({ user, setUser }) {
  async function handleSignOut() {
    await UserApi.signOut();
    setAccessToken("");
    setUser(null);
  }
  return (
    <header>
      <nav>
        <NavLink to={CLIENT_ROUTES.MAIN_PAGE} className="navlink">
          Главная
        </NavLink>

        <NavLink to={CLIENT_ROUTES.RECIPES} className="navlink">
          Рецепты
        </NavLink>

        {user && (
          <NavLink to="/favorites" className="navlink">
            Избранное
          </NavLink>
        )}
        {user ? (
          <>
            <span className="username">{user.username}</span>
            <NavLink
              to={CLIENT_ROUTES.AUTH}
              className="navlink"
              onClick={handleSignOut}
            >
              Выход
            </NavLink>
          </>
        ) : (
          <NavLink to={CLIENT_ROUTES.AUTH} className="navlink">
            Вход
          </NavLink>
        )}
      </nav>
    </header>
  );
}

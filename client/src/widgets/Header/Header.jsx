import { NavLink, Link } from "react-router";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import "./Header.css";
import UserApi from "../../entities/user/api/UserApi";
import { setAccessToken } from "../../shared/lib/axiosInstance";
import { CLIENT_ROUTES } from "../../shared/consts/clientRoutes";
import { Menu } from "lucide-react";

export default function Header({ user, setUser }) {
  async function handleSignOut() {
    await UserApi.signOut();
    setAccessToken("");
    setUser(null);
    try {
      setMenuOpen(false);
    } catch (e) {
      // ignore if menu state not available yet
    }
    try {
      navigate(CLIENT_ROUTES.MAIN_PAGE);
    } catch (e) {
      // navigate may be undefined until hook runs; ignore
    }
  }

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header__container">
        {/* Логотип с бобром */}
        <Link to="/" className="header__logo">
          <span className="header__logo-icon">🦫</span>
          <span className="header__logo-text">
            Кулинарная книга: Веселый Бобер
          </span>
        </Link>

        {/* Навигация */}
        <nav className="header__nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "header__link header__link--active" : "header__link"
            }
          >
            Главная
          </NavLink>
          <NavLink
            to="/my-recipes"
            className={({ isActive }) =>
              isActive ? "header__link header__link--active" : "header__link"
            }
          >
            Мои рецепты
          </NavLink>
          <NavLink
            to="/recipes"
            className={({ isActive }) =>
              isActive ? "header__link header__link--active" : "header__link"
            }
          >
            Рецепты
          </NavLink>
          <NavLink
            to="/recipes-from-api"
            className={({ isActive }) =>
              isActive ? "header__link header__link--active" : "header__link"
            }
          >
            Рецепты ВСЕ
          </NavLink>
        </nav>

        {/* Пользовательское меню */}
        <div className="header__user" ref={menuRef}>
          {user ? (
            <>
              <span className="header__username">{user.username}</span>
              <button
                className="header__link header__link--button"
                onClick={() => setMenuOpen((s) => !s)}
                aria-expanded={menuOpen}
                aria-haspopup="true"
              >
                <Menu size={18} />
              </button>

              {menuOpen && (
                <div className="header__dropdown">
                  <button
                    type="button"
                    className="header__dropdown-item"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(CLIENT_ROUTES.FAVORITES);
                    }}
                  >
                    Избранное
                  </button>
                  <button
                    type="button"
                    className="header__dropdown-item"
                    onClick={() => {
                      setMenuOpen(false);
                      handleSignOut();
                    }}
                  >
                    Выход
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <button
                className="header__link header__link--button"
                onClick={() => setMenuOpen((s) => !s)}
                aria-expanded={menuOpen}
                aria-haspopup="true"
              >
                <Menu size={18} />
              </button>

              {menuOpen && (
                <div className="header__dropdown">
                  <button
                    type="button"
                    className="header__dropdown-item"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(CLIENT_ROUTES.AUTH);
                    }}
                  >
                    Вход
                  </button>
                  <button
                    type="button"
                    className="header__dropdown-item"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(`${CLIENT_ROUTES.AUTH}?mode=register`);
                    }}
                  >
                    Регистрация
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

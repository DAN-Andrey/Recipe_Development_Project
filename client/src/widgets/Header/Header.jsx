import { NavLink, Link } from "react-router";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
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
            to="/tasks"
            className={({ isActive }) =>
              isActive ? "header__link header__link--active" : "header__link"
            }
          >
            Мои рецепты
          </NavLink>
          <NavLink
            to="/counter"
            className={({ isActive }) =>
              isActive ? "header__link header__link--active" : "header__link"
            }
          >
            Рецепты
          </NavLink>
          <NavLink
            to="/timer"
            className={({ isActive }) =>
              isActive ? "header__link header__link--active" : "header__link"
            }
          >
            Еще что-то
          </NavLink>
        </nav>

        {/* Пользовательское меню */}
        <div className="header__user" ref={menuRef}>
          {user ? (
            <>
              <span className="header__username">{user.username}</span>
              <button
                onClick={handleSignOut}
                className="header__link header__link--button"
              >
                Выход
              </button>
            </>
          ) : (
            <>
              <button
                className="header__link header__link--button"
                onClick={() => setMenuOpen((s) => !s)}
                aria-expanded={menuOpen}
                aria-haspopup="true"
              >
                Вход
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
                  <button
                    type="button"
                    className="header__dropdown-item"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/favorites");
                    }}
                  >
                    Избранное
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

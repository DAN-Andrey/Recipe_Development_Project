import "./AuthPage.css";
import SignUpForm from "../../features/Auth/ui/SignUpForm/SignUpForm";
import SignInForm from "../../features/Auth/ui/SignInForm/SignInForm";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

export default function AuthPage({ setUser }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === "register") {
      setIsSignUp(true);
    } else {
      setIsSignUp(false);
    }
  }, [searchParams]);

  return (
    <div className="app-container">
      <div className="form-container">
        {isSignUp ? (
          <SignUpForm setUser={setUser} />
        ) : (
          <SignInForm setUser={setUser} />
        )}
        {isSignUp ? (
          <>
            <p>Уже есть учетная запись?</p>
            <span className="auth-link" onClick={() => setIsSignUp(!isSignUp)}>
              Войти
            </span>
          </>
        ) : (
          <>
            <p>Еще нет учетной записи?</p>
            <span className="auth-link" onClick={() => setIsSignUp(!isSignUp)}>
              Создать
            </span>
          </>
        )}
      </div>
    </div>
  );
}

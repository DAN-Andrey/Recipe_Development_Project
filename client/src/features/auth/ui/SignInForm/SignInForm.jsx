import { useState } from 'react';
import { useNavigate } from 'react-router';
import './SignInForm.css';
import { UserValidator } from '../../../../entities/user/model/UserValidator';
import UserApi from '../../../../entities/user/api/UserApi';
import { setAccessToken } from '../../../../shared/lib/axiosInstance';
import FormInput from '../../../../shared/ui/FormInput/FormInput';

export default function SignInForm({ setUser }) {
  const initialValue = { email: '', password: '' };
  const navigate = useNavigate();

  const [signInData, setSignInData] = useState(initialValue);

  const inputHandler = (event) => {
    setSignInData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const signInHandler = async (event) => {
    event.preventDefault();

    const { isValid, error: validationError } =
      UserValidator.validateSignInData(signInData);

    if (!isValid) {
      alert(validationError);
      return;
    }
    const { statusCode, data, error } = await UserApi.signIn(signInData);
    if (statusCode === 200) {
      setAccessToken(data.accessToken);
      setUser(data.user);
      navigate('/my-recipes');
      setSignInData(initialValue);
    } else {
      alert(error || 'Ошибка при входе в приложение');
    }
  };

  return (
    <div>
      <form className="form" onSubmit={signInHandler}>
        <FormInput
          placeholder=" "
          name="email"
          type="email"
          required
          onChange={inputHandler}
          value={signInData.email}
          label="Почта"
        />
        <FormInput
          placeholder=" "
          name="password"
          type="password"
          required
          onChange={inputHandler}
          value={signInData.password}
          label="Пароль"
        />
        <button className="form-action-button">Войти</button>
      </form>
    </div>
  );
}

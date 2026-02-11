import { useEffect, useState } from 'react';
import AppRouter from './app/routing/AppRouter';
import './App.css';
import UserApi from './entities/user/api/UserApi';

// Компонент React - это функция
function App() {
  const [user, setUser] = useState(null);

  async function refreshUser() {
    const { data, statusCode, error } = await UserApi.refresh();

    if (statusCode === 200) {
      setUser(data.user);
    }
  }

  useEffect(() => {
    refreshUser();
  }, []);

  return <AppRouter setUser={setUser} user={user} />;
}

export default App;

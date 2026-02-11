import React from 'react';
import './Layout.css';
import { Outlet } from 'react-router';
import Header from '../../widgets/Header/Header';

export default function Layout({ user, setUser }) {
  return (
    <>
      <Header user={user} setUser={setUser} />
      <Outlet />
      <footer>Footer</footer>
    </>
  );
}

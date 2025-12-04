import React from 'react';
import Auth0Integration from './components/Auth0Integration';
import ToDoList from './components/to_do_list-component/to_do_list';
import './App.css';

function App() {
  return (
    <Auth0Integration>
      {({ user, logout, isAuthenticated }) => (
        <ToDoList user={user} logout={logout} />
      )}
    </Auth0Integration>
  );
}

export default App;

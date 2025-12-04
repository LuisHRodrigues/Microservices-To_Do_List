import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Auth0Integration = ({ children }) => {
  const {
    isLoading,
    isAuthenticated,
    error,
    loginWithRedirect,
    logout: auth0Logout,
    user,
  } = useAuth0();

  const login = () => loginWithRedirect();
  
  const signup = () => 
    loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } });

  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-blue-100 flex items-center justify-center">
        <div className="text-blue-800 text-xl">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-red-100 flex items-center justify-center">
        <div className="text-red-800 text-xl">Erro: {error.message}</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-blue-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold text-center mb-6">Bem-vindo</h1>
          <div className="space-y-4">
            <button
              onClick={login}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Login
            </button>
            <button
              onClick={signup}
              className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children({ user, logout, isAuthenticated: true });
};

export default Auth0Integration;
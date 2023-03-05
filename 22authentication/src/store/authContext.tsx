import React, { useState } from 'react';

let timeoutId: NodeJS.Timeout;

export const AuthContext = React.createContext({
  tokenId: '' as string | null,
  isAuth: false,
  login: (token: string, expiresIn: string) => {},
  logout: () => {},
});

// console.log(Date.now());

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  if (!token && Number(localStorage.getItem('expireTomeStamp')) > Date.now()) {
    setToken(localStorage.getItem('token'));
  }

  const logout = () => {
    setToken(null);

    localStorage.removeItem('token');
    localStorage.removeItem('expireTomeStamp');

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  const login = (token: string, expiresIn: string) => {
    setToken(token);

    const expiresInMs = +expiresIn * 1000;

    localStorage.setItem('token', token);
    localStorage.setItem('expireTomeStamp', (Date.now() + expiresInMs).toString());

    timeoutId = setTimeout(() => {
      logout();
    }, expiresInMs);
  };

  const contextValue = {
    tokenId: token,
    isAuth: !!token,
    login,
    logout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

import React, { createContext, useCallback, useState, useContext } from 'react';
import { useToasts } from 'bumbag';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  profile?: 'guest' | 'administrator';
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignCredencials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignCredencials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const toasts = useToasts();
  const [data, setData] = useState<AuthState>(() => {
    const token = sessionStorage.getItem('@HarpaCristaAdmin:token');
    const user = sessionStorage.getItem('@HarpaCristaAdmin:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ email, password }) => {
      const response = await api.post('sessions', {
        email,
        password,
      });

      const { token, user } = response.data;

      if (user.profile !== 'administrator') {
        toasts.danger({
          accent: 'bottom',
          title: 'Usuário sem privilégios administrativos.',
        });
        throw new Error();
      }

      sessionStorage.setItem('@HarpaCristaAdmin:token', token);
      sessionStorage.setItem('@HarpaCristaAdmin:user', JSON.stringify(user));

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ token, user });
    },
    [toasts],
  );

  const signOut = useCallback(() => {
    sessionStorage.removeItem('@HarpaCristaAdmin:token');
    sessionStorage.removeItem('@HarpaCristaAdmin:user');
    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      setData({
        token: data.token,
        user,
      });

      sessionStorage.setItem('@HarpaCristaAdmin:user', JSON.stringify(user));
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

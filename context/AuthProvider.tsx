import { createContext, useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from '../api';


interface IContexto {
  tokenState: string | null;
  nameUser: string | null;
  logar: (email: string, password: string) => Promise<void>;
  deslogar: () => Promise<void>;
}

export const AuthContext = createContext({} as IContexto);


interface IProps {
  children: React.ReactNode;
}
export function AuthProviderContext({ children }: IProps) {
  const [tokenState, setTokenState] = useState<string | null>(null);
  const [nameUser, setNameUser] = useState<string | null>(null);


  async function logar(username: string, password: string) {
    const dados = {
      username, password
    }
    try {
      const response = await api.post('users/session', dados);

      const { token, name } = response.data as { token: string, name: string };

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      await AsyncStorage.setItem('auth.token', token);
      await AsyncStorage.setItem('auth.nameUser', name);
      setTokenState(token);
      setNameUser(name)

    } catch (error) {
      console.log('error aqui', error);
    }
  }
  async function deslogar() {
    setTokenState(null);
    setNameUser(null);
    await AsyncStorage.removeItem('auth.token');
    await AsyncStorage.removeItem('auth.nameUser');
  }

  useEffect(() => {
    async function loadStorage() {
      const tokenStorage = await AsyncStorage.getItem('auth.token');
      const nameStorage = await AsyncStorage.getItem('auth.nameUser');
      
      if (tokenStorage) {
        api.defaults.headers.common.Authorization = `Bearer ${tokenStorage}`;
        setTokenState(tokenStorage);
        setNameUser(nameStorage);
      }
    }
    loadStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ tokenState, nameUser, logar, deslogar }}>
      {children}
    </AuthContext.Provider>
  )
}

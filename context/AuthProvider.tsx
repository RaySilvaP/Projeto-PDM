import { createContext, useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from '../api';

export type Address = {
    city: string,
    state: string,
    location: {
        type: 'Point',
        coordinates: [number, number]
    }
};


interface IContexto {
    tokenState: string | null;
    email: string | null;
    register: (username: string, email: string, password: string, location: Address) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext({} as IContexto);


interface IProps {
    children: React.ReactNode;
}
export function AuthProviderContext({ children }: IProps) {
    const [tokenState, setTokenState] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);


    async function login(username: string, password: string) {
        const data = {
            username, password
        }
        try {
            const response = await api.post('/login', data);

            const { token, user } = response.data as { token: string, user: { email: string, role: string } };

            api.defaults.headers.common.Authorization = `Bearer ${token}`;

            await AsyncStorage.setItem('auth.token', token);
            await AsyncStorage.setItem('auth.email', user.email);
            setTokenState(token);
            setEmail(user.email)

        } catch (error) {
            console.log('error aqui', error);
        }
    }
    async function register(username: string, email: string, password: string, location: Address) {
        const data = { username, email, password, location}
        try {
            await api.post('/user', data);
        } catch (error) {
            console.log('Register error', error);
        }
    }

    async function logout() {
        setTokenState(null);
        setEmail(null);
        await AsyncStorage.removeItem('auth.token');
        await AsyncStorage.removeItem('auth.email');
    }

    useEffect(() => {
        async function loadStorage() {
            const tokenStorage = await AsyncStorage.getItem('auth.token');
            const nameStorage = await AsyncStorage.getItem('auth.email');

            if (tokenStorage) {
                api.defaults.headers.common.Authorization = `Bearer ${tokenStorage}`;
                setTokenState(tokenStorage);
                setEmail(nameStorage);
            }
        }
        loadStorage();
    }, []);

    return (
        <AuthContext.Provider value={{ tokenState, email, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

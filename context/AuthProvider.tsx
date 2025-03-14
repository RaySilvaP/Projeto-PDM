import { createContext, useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from '@/api';


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
    signup: (username: string, email: string, password: string, location: Address) => Promise<{ success: boolean; message: string }>;
    login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext({} as IContexto);


interface IProps {
    children: React.ReactNode;
}
export function AuthProviderContext({ children }: IProps) {
    const [tokenState, setTokenState] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);


    async function login(email: string, password: string): Promise<{ success: boolean; message: string }> {
        const data = {
            email, password
        }
        try {
            const response = await api.post('/login', data);

            const { token, user } = response.data as { token: string, user: { email: string, role: string } };

            api.defaults.headers.common.Authorization = `Bearer ${token}`;

            await AsyncStorage.setItem('auth.token', token);
            await AsyncStorage.setItem('auth.email', user.email);
            setTokenState(token);
            setEmail(user.email)

            return { success: true, message: "Login realizado com sucesso!" };
        } catch (error: any) {
            console.log(error);
            const errorMessage = error.response?.data?.message || "Erro ao realizar login. Verifique suas credenciais.";
            return { success: false, message: errorMessage };
        }
    }
    async function signup(userName: string, email: string, password: string, address: Address): Promise<{ success: boolean; message: string }> {
        const data = { userName, email, password, address }
        try {
            await api.post('/user', data);
            return { success: true, message: "Cadastro realizado com sucesso!" };
        } catch (error: any) {
            console.log(error);
            const errorMessage = error.response?.data?.message || "Erro ao realizar cadastro.";
            return { success: false, message: errorMessage };
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
        <AuthContext.Provider value={{ tokenState, email, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

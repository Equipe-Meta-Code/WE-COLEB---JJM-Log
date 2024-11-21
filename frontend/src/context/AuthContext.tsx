import React, { createContext, useCallback, useContext, useState } from "react";
import api from "../services/api";

interface AuthContextState {
    token: string;
    login: string | null;
    userId: string | null;
    signIn(userData: UserData): Promise<void>;
    userLogged(): boolean;
    signOut(): void;
}

interface UserData {
    login: string;
    senha: string;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string>(() => {
        const token = localStorage.getItem('@Upload:token');
        if (token) {
            api.defaults.headers.authorization = `Bearer ${token}`;
            return token;
        }
        return '';
    });

    const [login, setLogin] = useState<string | null>(() => {
        return localStorage.getItem('@Upload:login');
    });

    const [userId, setUserId] = useState<string | null>(() => {
        const storedUserId = localStorage.getItem('@Upload:userId');
        console.log('Recovered userId from localStorage:', storedUserId); // Debug do localStorage
        return storedUserId;
    });

    const signIn = useCallback(async ({ login, senha }: UserData) => {
        try {
            const response = await api.post('/sessions', { login, senha });
            console.log('API response:', response.data); // Log para verificar a resposta da API

            const { token, userId } = response.data; // `userId` deve estar agora na resposta

            if (!token || !userId) {
                console.error('Missing token or userId in response');
                return;
            }

            // Salva token e userId no estado e localStorage
            setToken(token);
            setLogin(login);
            setUserId(userId);

            localStorage.setItem('@Upload:token', token);
            localStorage.setItem('@Upload:login', login);
            localStorage.setItem('@Upload:userId', userId); // Salvando o userId no localStorage
            api.defaults.headers.authorization = `Bearer ${token}`;
        } catch (error) {
            console.error('Error during signIn:', error);
            throw error;
        }
    }, []);

    const signOut = useCallback(() => {
        setToken('');
        setLogin(null);
        setUserId(null);
        localStorage.removeItem('@Upload:token');
        localStorage.removeItem('@Upload:login');
        localStorage.removeItem('@Upload:userId');
        window.location.href = '/login';
    }, []);

    const userLogged = useCallback(() => {
        return !!localStorage.getItem('@Upload:token');
    }, []);

    return (
        <AuthContext.Provider value={{ token, login, userId, signIn, userLogged, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): AuthContextState {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };

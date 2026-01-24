import { createContext, useState, useEffect, type ReactNode } from "react";
import type { User } from "../services/auth.service";
import { authService } from "../services/auth.service";

interface AuthContextType {
    user: User | null;
    isAuthentificated: boolean;
    loading: boolean;
    login: (userData: User, token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = authService.getUser();
        if (savedUser) {
            setUser(savedUser);
        }
        setLoading(false);
    }, []);

    const login = (userData: User, token: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            isAuthentificated: !!user, 
            loading,
            login, 
            logout 
        }}>
            {children}
        </AuthContext.Provider>
    );
};
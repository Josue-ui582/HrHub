
import { createContext, useState, type ReactNode } from "react";
import type { User } from "../services/auth.service";
import { authService } from "../services/auth.service";

interface AuthContextType {
    user: User | null;
    isAuthentificated: boolean,
    login: (userData: User, token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children} : {children : ReactNode}) => {
    const [user, setUser] = useState<User | null>(authService.getUser());

    const login = (userData : User, token : string) => {
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    }

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return(
        <AuthContext.Provider value={{user, isAuthentificated: !!user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
export type UserRole = "admin" | "user";

export interface User {
    id : string,
    email : string,
    role : UserRole
}

export const authService =  {
    getUser : () : User | null => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    },

    isAutentificated : () : boolean => {
        return !!localStorage.getItem("token")
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
}
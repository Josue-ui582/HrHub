export type UserRole = "ADMIN" | "USER";

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

export const loginUser = async (email: string, password: string) => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    });

    const data = response.json();
    if (!response.ok) {
    throw new Error("Identifiants invalides");
  }
    return data;
}

export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) => {
    const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
        }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Erreur d'inscription");
    }
  return data;
};
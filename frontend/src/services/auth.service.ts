export type UserRole = "admin" | "user";

export interface User {
    id : string,
    email : string,
    role : UserRole
}

const MOCK_USERS = {
  admin: { id: '1', email: 'admin@test.com', role: 'admin' as const, password: 'password123' },
  user: { id: '2', email: 'user@test.com', role: 'user' as const, password: 'password123' }
};

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
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === MOCK_USERS.admin.email && password === MOCK_USERS.admin.password) {
                resolve({ user: MOCK_USERS.admin, token: 'fake-jwt-token-admin' });
            } else if (email === MOCK_USERS.user.email && password === MOCK_USERS.user.password) {
                resolve({ user: MOCK_USERS.user, token: 'fake-jwt-token-user' });
            } else {
                reject(new Error("Identifiants invalides"));
            }
        }, 1000)
    })
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

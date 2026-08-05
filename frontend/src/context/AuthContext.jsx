import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginUser, registerUser } from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("devilbeats_token"));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem("devilbeats_user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await loginUser(email, password);
        const authUser = {
            id: response.user?.id ?? 1,
            email,
            username: response.user?.username ?? email.split("@")[0],
        };

        localStorage.setItem("devilbeats_token", response.access_token);
        localStorage.setItem("devilbeats_user", JSON.stringify(authUser));
        setToken(response.access_token);
        setUser(authUser);
        return authUser;
    };

    const register = async (username, email, password) => {
        const response = await registerUser(username, email, password);
        return response;
    };

    const logout = () => {
        localStorage.removeItem("devilbeats_token");
        localStorage.removeItem("devilbeats_user");
        setToken(null);
        setUser(null);
    };

    const value = useMemo(
        () => ({ user, token, loading, login, register, logout }),
        [user, token, loading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}

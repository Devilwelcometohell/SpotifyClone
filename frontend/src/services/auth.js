import api from "./api";

export async function loginUser(email, password) {
    const response = await api.post("/login", { email, password });
    return response.data;
}

export async function registerUser(username, email, password) {
    const response = await api.post("/register", { username, email, password });
    return response.data;
}

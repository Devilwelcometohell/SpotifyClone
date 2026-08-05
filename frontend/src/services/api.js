import axios from "axios";

const api = axios.create({
    baseURL: "https://spotifyclone-87zk.onrender.com",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("devilbeats_token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;

import axios from "axios";

const API = `${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}/profile`;

export async function getProfile(userId) {

    const res = await axios.get(`${API}/${userId}`);

    return res.data;

}

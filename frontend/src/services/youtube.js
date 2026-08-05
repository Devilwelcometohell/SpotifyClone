import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function searchSongs(query) {
    const response = await axios.get(`${API}/songs/search`, {
        params: {
            query: query,
        },
    });

    return response.data;
}

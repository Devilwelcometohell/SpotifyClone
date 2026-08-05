import api from "./api";

export async function searchSongs(query) {
    const response = await api.get("/songs/search", {
        params: {
            query,
        },
    });

    return response.data;
}

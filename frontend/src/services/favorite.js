import api from "./api";

export async function addFavorite(userId, songId) {
    const res = await api.post("/favorites/", null, {
        params: {
            user_id: userId,
            song_id: songId,
        },
    });

    return res.data;
}

export async function getFavorites(userId) {
    const res = await api.get("/favorites/", {
        params: {
            user_id: userId,
        },
    });

    return res.data;
}

export async function removeFavorite(userId, songId) {
    const res = await api.delete("/favorites/", {
        params: {
            user_id: userId,
            song_id: songId,
        },
    });

    return res.data;
}
import api from "./api";

export async function getPlaylists(userId) {
    const res = await api.get(`/playlist/${userId}`);
    return res.data;
}

export async function createPlaylist(name, userId) {
    const res = await api.post("/playlist/create", {
        name,
        user_id: userId,
    });

    return res.data;
}

export async function deletePlaylist(id) {
    const res = await api.delete(`/playlist/${id}`);
    return res.data;
}
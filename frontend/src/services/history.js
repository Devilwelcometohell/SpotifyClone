import api from "./api";

export async function addHistory(userId, songId) {
    const res = await api.post("/history/add", {
        user_id: userId,
        song_id: songId,
    });

    return res.data;
}

export async function getHistory(userId) {
    const res = await api.get(`/history/${userId}`);
    return res.data;
}
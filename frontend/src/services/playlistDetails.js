import api from "./api";

export async function getPlaylistDetails(id) {
    const res = await api.get(`/playlist-details/${id}`);
    return res.data;
}
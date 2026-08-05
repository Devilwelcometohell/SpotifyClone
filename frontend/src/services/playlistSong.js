import axios from "axios";

const API = `${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}/playlist-song`;

export async function addSongToPlaylist(playlistId, songId) {

    const res = await axios.post(`${API}/add`, {
        playlist_id: playlistId,
        song_id: songId
    });

    return res.data;
}

export async function getPlaylistSongs(playlistId) {

    const res = await axios.get(`${API}/${playlistId}`);

    return res.data;
}

export async function removeSong(id) {

    const res = await axios.delete(`${API}/${id}`);

    return res.data;
}

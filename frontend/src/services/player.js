import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function playSong(song) {

    const response = await axios.get(`${API}/player/play`, {
        params: {
            song: song.title,
            artist: song.artist,
        },
    });

    return response.data;
}

import api from "./api";

export async function playSong(song) {
    const response = await api.get("/player/play", {
        params: {
            song: song.title,
            artist: song.artist,
        },
    });

    return response.data;
}

import { useEffect, useState } from "react";
import { getPlaylists } from "../../services/playlist";
import { addSongToPlaylist } from "../../services/playlistSong";
import { useAuth } from "../../context/AuthContext";

function PlaylistModal({ open, onClose, song }) {
    const [playlists, setPlaylists] = useState([]);
    const { user } = useAuth();

    const USER_ID = user?.id ?? 1;

    useEffect(() => {
        if (!open) return;

        async function loadPlaylists() {
            try {
                const data = await getPlaylists(USER_ID);
                setPlaylists(data);
            } catch (err) {
                console.log(err);
            }
        }

        loadPlaylists();
    }, [open]);

    async function handleAdd(playlistId) {
        try {
            await addSongToPlaylist(playlistId, song.id);

            alert("✅ Song added to playlist");

            onClose();
        } catch (err) {
            console.log(err);

            if (err.response?.data?.detail) {
                alert(err.response.data.detail);
            } else {
                alert("Failed to add song");
            }
        }
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

            <div className="bg-zinc-900 p-6 rounded-xl w-[420px] border border-pink-500">

                <h2 className="text-2xl font-bold text-white mb-5">
                    Select Playlist
                </h2>

                <div className="space-y-3">

                    {playlists.length === 0 ? (

                        <p className="text-gray-400">
                            No playlists found
                        </p>

                    ) : (

                        playlists.map((playlist) => (

                            <button
                                key={playlist.id}
                                onClick={() => handleAdd(playlist.id)}
                                className="w-full text-left p-4 bg-zinc-800 rounded-lg hover:bg-pink-600 transition text-white"
                            >
                                {playlist.name}
                            </button>

                        ))

                    )}

                </div>

                <button
                    onClick={onClose}
                    className="mt-6 w-full bg-red-500 py-3 rounded-lg hover:bg-red-600 text-white"
                >
                    Close
                </button>

            </div>

        </div>
    );
}

export default PlaylistModal;
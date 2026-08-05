import { useState } from "react";
import { FaPlay, FaHeart, FaPlus } from "react-icons/fa";

import logo from "../../assets/logo.png";

import { addFavorite } from "../../services/favorite";
import PlaylistModal from "../playlist/PlaylistModal";
import { useAuth } from "../../context/AuthContext";

function SongCard({ song, onPlay }) {

    const [showPlaylistModal, setShowPlaylistModal] = useState(false);
    const { user } = useAuth();

    async function handleFavorite() {

        try {

            await addFavorite(user?.id ?? 1, song.id);

            alert("❤️ Added to Favorites");

        }

        catch {

            alert("Failed");

        }

    }

    return (

        <>

            <div className="group w-full max-w-[320px] overflow-hidden rounded-3xl border border-white/10 bg-black/60 shadow-[0_18px_45px_rgba(0,0,0,.35)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-cyan-300/60 hover:shadow-[0_20px_55px_rgba(34,211,238,.18)]">

                <div className="relative h-52 overflow-hidden">
                    <img

                        src={song.thumbnail || logo}

                        alt={`${song.title} cover`}

                        onError={(event) => { event.currentTarget.src = logo; }}

                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"

                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                    <button onClick={onPlay} className="absolute bottom-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-pink-500 text-white shadow-[0_0_24px_rgba(236,72,153,.7)] transition hover:scale-110" aria-label={`Play ${song.title}`}><FaPlay className="ml-0.5" /></button>
                    <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-medium text-cyan-100 backdrop-blur-md">{song.genre || "Music"}</span>
                </div>

                <div className="p-5 space-y-2">

                    <h2 className="text-xl font-bold text-white line-clamp-2">

                        {song.title}

                    </h2>

                    <p className="text-gray-300">

                        {song.artist}

                    </p>

                    <p className="text-gray-500 text-sm">

                        {song.album}

                    </p>

                    <div className="flex justify-between items-center pt-4">

                        <button

                            onClick={onPlay}

                            className="rounded-full border border-pink-400/30 bg-pink-500/10 px-5 py-2 text-pink-100 transition hover:bg-pink-500/20"

                        >

                            <FaPlay />

                            Play now

                        </button>

                        <div className="flex items-center gap-4">

                            {/* Add to Playlist */}

                            <button

                                onClick={() => setShowPlaylistModal(true)}

                                className="text-cyan-400 text-2xl hover:text-cyan-300 hover:scale-125 transition"

                                title="Add to Playlist"

                            >

                                <FaPlus />

                            </button>

                            {/* Favorite */}

                            <button

                                onClick={handleFavorite}

                                className="text-pink-500 text-2xl hover:text-red-400 hover:scale-125 transition"

                                title="Add to Favorites"

                            >

                                <FaHeart />

                            </button>

                        </div>

                    </div>

                </div>

            </div>

            <PlaylistModal

                open={showPlaylistModal}

                onClose={() => setShowPlaylistModal(false)}

                song={song}

            />

        </>

    );

}

export default SongCard;

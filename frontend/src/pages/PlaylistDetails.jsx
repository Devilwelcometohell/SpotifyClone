import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

import { getPlaylistDetails } from "../services/playlistDetails";
import { removeSong } from "../services/playlistSong";

function PlaylistDetails() {

    const { id } = useParams();

    const [songs, setSongs] = useState([]);

    async function loadSongs() {

        try {

            const data = await getPlaylistDetails(id);

            setSongs(data);

        } catch (err) {

            console.log(err);

        }

    }

    useEffect(() => {

        loadSongs();

    }, [id]);

    async function handleDelete(songId) {

        try {

            await removeSong(songId);

            loadSongs();

        } catch (err) {

            console.log(err);

        }

    }

    return (

        <div className="text-white">

            <h1 className="text-5xl font-bold mb-10">

                🎵 Playlist Songs

            </h1>

            {

                songs.length === 0 ?

                (

                    <p className="text-gray-400 text-xl">

                        No songs in this playlist.

                    </p>

                )

                :

                (

                    <div className="space-y-4">

                        {

                            songs.map((song) => (

                                <div
                                    key={song.id}
                                    className="flex items-center justify-between bg-black/40 backdrop-blur-xl rounded-2xl p-5 border border-pink-500/20 hover:border-pink-500 transition"
                                >

                                    <div className="flex items-center gap-5">

                                        <img
                                            src={
                                                song.thumbnail && song.thumbnail.trim() !== ""
                                                ? song.thumbnail
                                                : "https://placehold.co/200x200?text=No+Image"
                                            }
                                            alt={song.title}
                                            className="w-20 h-20 rounded-xl object-cover"
                                        />

                                        <div>

                                            <h2 className="text-2xl font-bold">

                                                {song.title}

                                            </h2>

                                            <p className="text-gray-400">

                                                {song.artist}

                                            </p>

                                            <p className="text-pink-400">

                                                {song.album}

                                            </p>

                                        </div>

                                    </div>

                                    <button
                                        onClick={() => handleDelete(song.id)}
                                        className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl flex items-center gap-2"
                                    >

                                        <FaTrash />

                                        Remove

                                    </button>

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}

export default PlaylistDetails;
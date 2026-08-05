import { useEffect, useState } from "react";
import {
    createPlaylist,
    getPlaylists,
    deletePlaylist
} from "../services/playlist";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Playlists() {

    const [playlists, setPlaylists] = useState([]);
    const [name, setName] = useState("");
    const { user } = useAuth();

    const USER_ID = user?.id ?? 1;

    async function loadPlaylists() {

        try {

            const data = await getPlaylists(USER_ID);

            setPlaylists(data);

        } catch (err) {

            console.log(err);

        }

    }

    useEffect(() => {

        loadPlaylists();

    }, []);

    async function handleCreate() {

        if (!name.trim()) return;

        try {

            await createPlaylist(name, USER_ID);

            setName("");

            loadPlaylists();

        } catch (err) {

            console.log(err);

        }

    }

    async function handleDelete(id) {

        try {

            await deletePlaylist(id);

            loadPlaylists();

        } catch (err) {

            console.log(err);

        }

    }

    return (

        <div className="text-white">

            <h1 className="text-5xl font-bold mb-8">
                🎵 My Playlists
            </h1>

            {/* Create Playlist */}

            <div className="flex gap-4 mb-10">

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Playlist Name"
                    className="bg-black/40 border border-pink-500 rounded-xl px-4 py-3 w-80"
                />

                <button
                    onClick={handleCreate}
                    className="bg-pink-500 px-6 rounded-xl hover:bg-pink-600 transition"
                >
                    Create
                </button>

            </div>

            {/* Playlist Grid */}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {playlists.map((playlist) => (

                    <div
                        key={playlist.id}
                        className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-pink-500/20 hover:border-pink-500 transition"
                    >

                        {/* Clickable Playlist Card */}

                        <Link
                            to={`/playlists/${playlist.id}`}
                            className="block"
                        >

                            <h2 className="text-2xl font-bold hover:text-pink-400 transition">

                                🎵 {playlist.name}

                            </h2>

                            <p className="text-gray-400 mt-2">

                                Playlist ID : {playlist.id}

                            </p>

                        </Link>

                        {/* Buttons */}

                        <div className="flex gap-3 mt-5">

                            <Link
                                to={`/playlists/${playlist.id}`}
                                className="bg-cyan-500 px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
                            >
                                Open
                            </Link>

                            <button
                                onClick={() => handleDelete(playlist.id)}
                                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default Playlists;
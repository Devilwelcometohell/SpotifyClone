import { useEffect, useState } from "react";
import { FaPlay, FaHistory } from "react-icons/fa";

import { getHistory } from "../services/history";
import { useAuth } from "../context/AuthContext";

function History() {

    const [songs, setSongs] = useState([]);
    const { user } = useAuth();

    const USER_ID = user?.id ?? 1;

    async function loadHistory() {

        try {

            const data = await getHistory(USER_ID);

            setSongs(data);

        } catch (err) {

            console.log(err);

        }

    }

    useEffect(() => {

        loadHistory();

    }, []);

    return (

        <div className="text-white">

            <div className="flex items-center gap-4 mb-10">

                <FaHistory className="text-5xl text-pink-500" />

                <h1 className="text-5xl font-bold">

                    Recently Played

                </h1>

            </div>

            {

                songs.length === 0 ?

                (

                    <div className="text-gray-400 text-xl">

                        No songs played yet.

                    </div>

                )

                :

                (

                    <div className="space-y-5">

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

                                        className="bg-green-500 hover:bg-green-600 px-5 py-3 rounded-xl flex items-center gap-2"

                                    >

                                        <FaPlay />

                                        Play

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

export default History;
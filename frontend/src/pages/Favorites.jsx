import { useEffect, useState } from "react";
import SongCard from "../components/songs/SongCard";
import { getFavorites } from "../services/favorite";
import { useAuth } from "../context/AuthContext";
import { usePlayer } from "../context/PlayerContext";

function Favorites() {

    const { user } = useAuth();
    const USER_ID = user?.id ?? 1;
    const { setCurrentSong, setQueue } = usePlayer();

    const [songs, setSongs] = useState([]);

    async function loadFavorites() {

        try {

            const data = await getFavorites(USER_ID);

            setSongs(data);

        } catch (err) {

            console.log(err);

        }

    }

    useEffect(() => {

        loadFavorites();

    }, []);

    useEffect(() => {
        setQueue(songs);
    }, [songs, setQueue]);

    return (

        <>

            <div className="flex justify-between items-center mb-10">

                <h1 className="text-5xl font-bold text-white">

                    ❤️ Favorites

                </h1>

                <p className="text-pink-400 text-xl">

                    {songs.length} Songs

                </p>

            </div>

            {

                songs.length === 0 ?

                (

                    <div className="text-center mt-32">

                        <h2 className="text-3xl text-gray-400">

                            No Favorite Songs Yet ❤️

                        </h2>

                        <p className="text-gray-500 mt-3">

                            Search songs and click the heart icon.

                        </p>

                    </div>

                )

                :

                (

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-40">

                        {

                            songs.map(song => (

                                <SongCard

                                    key={song.id}

                                    song={song}

                                    onPlay={() => setCurrentSong(song)}

                                />

                            ))

                        }

                    </div>

                )

            }

        </>

    );

}

export default Favorites;
import { useEffect, useState } from "react";

import SearchBar from "../components/search/SearchBar";
import SongCard from "../components/songs/SongCard";

import { usePlayer } from "../context/PlayerContext";
import { searchSongs } from "../services/youtube";

function Home() {

    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setCurrentSong, setQueue } = usePlayer();

    useEffect(() => {
        setQueue(songs);
    }, [songs, setQueue]);

    async function handleSearch(query) {

        try {

            setLoading(true);

            const data = await searchSongs(query);

            setSongs(data);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    }

    return (

        <>

            {/* Hero Section */}

            {songs.length === 0 && (

                <div className="flex justify-center mt-10">

                    <div className="w-full max-w-4xl rounded-[2rem] border border-pink-500/20 bg-black/50 p-10 shadow-[0_0_50px_rgba(255,0,120,0.15)] backdrop-blur-xl">

                        <SearchBar onSearch={handleSearch} />

                        <div className="mt-16">

                            <p className="text-2xl text-gray-300 mb-4">

                                Good Evening 😈

                            </p>

                            <h1 className="text-6xl lg:text-7xl font-black leading-tight">

                                Let the{" "}

                                <span className="text-pink-500">

                                    Music

                                </span>

                                <br />

                                Fuel Your{" "}

                                <span className="text-cyan-400">

                                    Soul.

                                </span>

                            </h1>

                            <div className="mt-8">
                                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Explore Bollywood</p>
                                <div className="flex flex-wrap gap-3">
                                    {["Bollywood hits", "Arijit Singh", "Diljit Dosanjh", "New Hindi songs"].map((query) => <button key={query} onClick={() => handleSearch(query)} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-pink-400/60 hover:bg-pink-500/15">{query}</button>)}
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            )}

            {/* Search */}

            {songs.length > 0 && (

                <>

                    <SearchBar onSearch={handleSearch} />

                    <div className="flex justify-between items-center mt-10 mb-8">

                        <h2 className="text-5xl font-bold">

                            🎵 Search Results

                        </h2>

                        <p className="text-pink-500 text-xl">

                            {songs.length} Songs Found

                        </p>

                    </div>

                </>

            )}

            {loading && (

                <div className="text-center text-pink-500 text-xl mt-10">

                    Searching...

                </div>

            )}

            {!loading && songs.length === 0 && (
                <div className="mt-10 rounded-[2rem] border border-pink-500/20 bg-black/45 p-8 text-center text-gray-300 shadow-[0_0_35px_rgba(255,0,120,0.12)]">
                    <p className="text-xl font-semibold text-white">No songs found for this search.</p>
                    <p className="mt-2 text-sm text-gray-400">Try a broader title like “Comedy” or an artist name.</p>
                    <div className="mt-6 inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                        Live search is ready for your next track.
                    </div>
                </div>
            )}

            <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-40">

                {songs.map(song => (

                    <SongCard

                        key={song.id}

                        song={song}

                        onPlay={() => setCurrentSong(song)}

                    />

                ))}

            </div>

        </>

    );

}

export default Home;

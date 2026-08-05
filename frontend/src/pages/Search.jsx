import { useEffect, useState } from "react";
import SearchBar from "../components/search/SearchBar";
import SongCard from "../components/songs/SongCard";
import { usePlayer } from "../context/PlayerContext";
import { searchSongs } from "../services/youtube";

function Search() {
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
        <div className="text-white">
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-5xl font-bold">Search</h1>
                    <p className="text-gray-400 mt-2">Discover songs, artists, and fresh beats.</p>
                </div>

                <SearchBar onSearch={handleSearch} />
            </div>

            {loading && <p className="text-pink-500 mt-8">Searching...</p>}

            {!loading && songs.length === 0 && (
                <div className="mt-10 rounded-[2rem] border border-pink-500/20 bg-black/45 p-8 text-gray-400 shadow-[0_0_35px_rgba(255,0,120,0.12)]">
                    Start with a search to see tracks appear here.
                </div>
            )}

            {!loading && songs.length > 0 && (
                <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 pb-40">
                    {songs.map((song) => (
                        <SongCard key={song.id} song={song} onPlay={() => setCurrentSong(song)} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Search;
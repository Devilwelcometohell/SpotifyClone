import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ onSearch }) {

    const [query, setQuery] = useState("");

    function handleSubmit(e) {

        e.preventDefault();

        if (!query.trim()) return;

        onSearch(query);

    }

    return (

        <form
            onSubmit={handleSubmit}
            className="max-w-2xl"
        >

            <div className="relative">

                <FaSearch className="absolute left-5 top-4 text-gray-400" />

                <input
                    type="text"
                    placeholder="Search your next beat..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-14 pr-16 py-4 rounded-full bg-black/60 backdrop-blur-xl border border-pink-500/30 text-white focus:outline-none focus:border-cyan-400"
                />

                <button
                    type="submit"
                    className="absolute right-2 top-2 rounded-full bg-pink-600 px-4 py-2 text-white hover:bg-pink-500 transition"
                >
                    Search
                </button>

            </div>

        </form>

    );

}

export default SearchBar;
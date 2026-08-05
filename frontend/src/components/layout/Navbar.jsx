import { FaMusic, FaSearch, FaUserCircle } from "react-icons/fa";

function Navbar() {
    return (
        <nav className="h-16 bg-zinc-900 flex items-center justify-between px-6 border-b border-zinc-800">

            <div className="flex items-center gap-3">
                <FaMusic className="text-green-500 text-2xl" />
                <h1 className="text-xl font-bold">
                    MusicHub AI
                </h1>
            </div>

            <div className="flex items-center bg-zinc-800 rounded-full px-4 py-2 w-96">
                <FaSearch className="mr-3 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search songs..."
                    className="bg-transparent outline-none w-full"
                />
            </div>

            <FaUserCircle className="text-3xl" />
        </nav>
    );
}

export default Navbar;
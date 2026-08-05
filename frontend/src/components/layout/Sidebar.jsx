import {
    FaHome,
    FaSearch,
    FaHeart,
    FaMusic,
    FaHistory,
    FaUser,
    FaCog,
    FaSignOutAlt
} from "react-icons/fa";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";
import SettingsModal from "../ui/SettingsModal";

function Sidebar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [settingsOpen, setSettingsOpen] = useState(false);

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (

        <div
            className="
                w-64
                h-screen
                fixed
                left-0
                top-0
                bg-black/50
                backdrop-blur-2xl
                border-r
                border-pink-500/20
                text-white
                flex
                flex-col
                justify-between
                shadow-[0_0_40px_rgba(255,0,120,0.15)]
            "
        >

            {/* Logo */}

            <div>

                <div className="flex items-center gap-3 px-6 pt-8 pb-10">

                    <img
                        src={logo}
                        alt="DevilBeats"
                        className="
                            w-16
                            h-16
                            rounded-xl
                            shadow-[0_0_20px_rgba(255,0,120,0.6)]
                        "
                    />

                    <div>

                        <h1 className="text-3xl font-bold">

                            <span className="text-white">
                                Devil
                            </span>

                            <span className="text-pink-500">
                                Beats
                            </span>

                        </h1>

                        <p className="text-xs text-pink-300 italic mt-1">
                            Feel the Fire. Hear the Beat.
                        </p>

                    </div>

                </div>

                {/* Navigation */}

                <ul className="px-4 space-y-3">

                    <Link to="/">

                        <li className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-pink-600/40 to-red-500/20 hover:bg-pink-500/30 hover:scale-105 transition">

                            <FaHome />

                            Home

                        </li>

                    </Link>

                    <Link to="/search">

                        <li className="flex items-center gap-4 p-4 rounded-xl hover:bg-pink-500/20 hover:scale-105 transition">

                            <FaSearch />

                            Search

                        </li>

                    </Link>

                    <Link to="/favorites">

                        <li className="flex items-center gap-4 p-4 rounded-xl hover:bg-pink-500/20 hover:scale-105 transition">

                            <FaHeart />

                            Favorites

                        </li>

                    </Link>

                    <Link to="/history">

                        <li className="flex items-center gap-4 p-4 rounded-xl hover:bg-pink-500/20 transition">

                        <FaHistory />

                         History

                        </li>

                    </Link>

                    <Link to="/playlists">

                        <li className="flex items-center gap-4 p-4 rounded-xl hover:bg-pink-500/20 hover:scale-105 transition">

                            <FaMusic />

                            Playlists

                        </li>

                    </Link>

                </ul>

            </div>

            {/* Bottom */}

            <div className="px-4 pb-8 space-y-3">

                <Link to="/profile">

                    <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-pink-500/20 hover:scale-105 transition">

                        <FaUser />

                        Profile

                    </div>

                </Link>

                <button
                    onClick={() => setSettingsOpen(true)}
                    className="flex w-full items-center gap-4 p-4 rounded-xl hover:bg-pink-500/20 hover:scale-105 cursor-pointer transition"
                >
                    <FaCog />
                    Settings
                </button>

                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-4 p-4 rounded-xl hover:bg-red-500/20 hover:scale-105 cursor-pointer text-red-400 transition"
                >
                    <FaSignOutAlt />
                    Logout
                </button>

            </div>

            <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />

        </div>

    );

}

export default Sidebar;
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Playlists from "./pages/Playlists";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import History from "./pages/History";
import Search from "./pages/Search";
import PlaylistDetails from "./pages/PlaylistDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
                path="*"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/favorites" element={<Favorites />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/history" element={<History />} />
                                <Route path="/search" element={<Search />} />
                                <Route path="/playlists" element={<Playlists />} />
                                <Route path="/playlists/:id" element={<PlaylistDetails />} />
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                        </Layout>
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;
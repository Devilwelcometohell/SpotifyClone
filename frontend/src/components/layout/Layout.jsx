import Sidebar from "./Sidebar";
import Player from "../player/Player";
import bg from "../../assets/devil-bg.jpg";

function Layout({ children }) {
    return (
        <div className="flex min-h-screen bg-black text-white">

            <Sidebar />

            <main
                className="ml-64 flex-1 relative overflow-y-auto"
                style={{
                    backgroundImage: `linear-gradient(135deg, rgba(18,18,18,0.95), rgba(5,5,5,0.9)), url(${bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                }}
            >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/70"></div>

                {/* Neon Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/15 via-transparent to-cyan-500/15"></div>

                {/* Main Content */}
                <div className="relative z-10 mx-auto max-w-7xl px-6 py-8 pb-40 lg:px-10 lg:py-10 lg:pb-56">
                    {children}
                </div>

                <Player />

            </main>

        </div>
    );
}

export default Layout;
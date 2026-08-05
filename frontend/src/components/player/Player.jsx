import { useEffect, useMemo, useState } from "react";
import YouTube from "react-youtube";
import {
    FaChevronDown,
    FaExpand,
    FaHeart,
    FaListUl,
    FaMinus,
    FaPause,
    FaPlay,
    FaSpinner,
    FaStepBackward,
    FaStepForward,
    FaVolumeUp,
} from "react-icons/fa";

import { playSong } from "../../services/player";
import { addHistory } from "../../services/history";
import { useAuth } from "../../context/AuthContext";
import { usePlayer } from "../../context/PlayerContext";
import { useSettings } from "../../context/SettingsContext";

function Player() {
    const { currentSong: song, queue, setCurrentSong } = usePlayer();
    const { user } = useAuth();
    const { settings, updateSettings } = useSettings();
    const [videoId, setVideoId] = useState("");
    const [player, setPlayer] = useState(null);
    const [playing, setPlaying] = useState(true);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [minimized, setMinimized] = useState(false);
    const [showQueue, setShowQueue] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const songs = useMemo(() => queue || [], [queue]);
    const currentIndex = songs.findIndex((item) => item.id === song?.id);

    useEffect(() => {
        async function loadSong() {
            if (!song) return;
            setLoading(true);
            setPlayer(null);
            setVideoId("");
            setCurrentTime(0);
            setDuration(0);
            try {
                try { player?.stopVideo(); } catch { /* Previous iframe has already been destroyed. */ }
                const data = song.videoId ? null : await playSong(song);
                setVideoId(song.videoId || data?.videoId || "");
                setPlaying(settings.autoplay);
                await addHistory(user?.id ?? 1, song.id);
            } catch (error) {
                console.error("Could not load song", error);
            } finally {
                setLoading(false);
            }
        }
        loadSong();
    }, [song?.id, user?.id]);

    useEffect(() => {
        if (!player) return undefined;
        const timer = setInterval(() => {
            try {
                setCurrentTime(player.getCurrentTime());
                setDuration(player.getDuration());
            } catch {
                // The YouTube iframe may not be ready yet.
            }
        }, 500);
        return () => clearInterval(timer);
    }, [player]);

    useEffect(() => {
        try { player?.setVolume(settings.volume); } catch { /* Ignore a stale YouTube iframe instance. */ }
    }, [player, settings.volume]);

    useEffect(() => {
        if (!player || settings.quality === "default") return;
        try { player.setPlaybackQuality(settings.quality); } catch { /* The selected quality may not be available for this video. */ }
    }, [player, settings.quality]);

    if (!song) return null;

    const previousSong = () => currentIndex > 0 && setCurrentSong(songs[currentIndex - 1]);
    const nextSong = () => currentIndex < songs.length - 1 && setCurrentSong(songs[currentIndex + 1]);
    const formatTime = (seconds) => `${Math.floor((seconds || 0) / 60)}:${Math.floor((seconds || 0) % 60).toString().padStart(2, "0")}`;

    const togglePlayback = () => {
        if (!player) return;
        try {
            playing ? player.pauseVideo() : player.playVideo();
            setPlaying((value) => !value);
        } catch {
            setPlayer(null);
        }
    };

    const playerOptions = {
        height: "100%",
        width: "100%",
        playerVars: { autoplay: 1, controls: 0, rel: 0, modestbranding: 1, playsinline: 1 },
    };

    return (
        <section className={`now-playing-shell ${minimized ? "now-playing-minimized" : expanded ? "now-playing-full" : "now-playing-dock"}`} aria-label="Now playing">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="now-playing-orb now-playing-orb-one" />
                <div className="now-playing-orb now-playing-orb-two" />
            </div>

            {minimized && (
                <button onClick={() => setMinimized(false)} className="relative z-10 flex w-full items-center gap-3 px-3 text-left" title="Restore now playing">
                    <img src={song.thumbnail || "https://placehold.co/80x80"} alt="" className="h-12 w-12 rounded-lg object-cover" />
                    <span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold text-white">{song.title}</span><span className="block truncate text-xs text-cyan-200/70">Now playing · Tap to open</span></span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-pink-500 text-white">{playing ? <FaPause /> : <FaPlay className="ml-0.5" />}</span>
                </button>
            )}
            <div className={`relative z-10 flex h-full min-h-0 flex-1 flex-col p-4 sm:p-6 ${minimized ? "player-content-minimized" : ""}`}>
                <header className="mb-4 flex items-center justify-between gap-3">
                    <button
                        onClick={() => setExpanded((value) => !value)}
                        className="flex min-w-0 items-center gap-3 text-left"
                        title={expanded ? "Return to side player" : "Open full screen player"}
                    >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-pink-400/30 bg-pink-500/10 text-pink-300">
                            {expanded ? <FaChevronDown /> : <FaExpand />}
                        </span>
                        <span className="min-w-0">
                            <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-pink-300">Now playing</span>
                            <span className="block truncate text-sm text-white/70">Tap to {expanded ? "minimize" : "expand"}</span>
                        </span>
                    </button>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setMinimized(true)} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10" title="Minimize player"><FaMinus /></button>
                        <button onClick={() => setShowQueue((value) => !value)} className={`grid h-10 w-10 place-items-center rounded-full border transition ${showQueue ? "border-cyan-300/70 bg-cyan-400/20 text-cyan-100" : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"}`} title="Toggle queue">
                            <FaListUl />
                        </button>
                    </div>
                </header>

                <div className={`min-h-0 flex-1 ${expanded && showQueue ? "grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_360px]" : "flex flex-col"}`}>
                    <div className="flex min-h-0 flex-col items-center justify-center">
                        <div className={`album-art-wrap ${playing ? "is-playing" : ""}`}>
                            {videoId && <div className="youtube-media" aria-hidden="true"><YouTube key={videoId} videoId={videoId} opts={playerOptions} onReady={(event) => { setPlayer(event.target); try { event.target.setVolume(settings.volume); if (settings.quality !== "default") event.target.setPlaybackQuality(settings.quality); if (settings.autoplay) event.target.playVideo(); } catch { setPlayer(null); } }} onEnd={nextSong} onError={() => setPlayer(null)} /></div>}
                            <img src={song.thumbnail || "https://placehold.co/700x700/111/ffffff?text=Music"} alt={`${song.title} cover`} className={`album-art ${expanded && videoId ? "album-art-hidden" : ""}`} />
                            <button onClick={() => setExpanded(true)} className="absolute inset-0 z-10" title="Open full screen player" aria-label="Open full screen player" />
                            {loading && <span className="absolute inset-0 z-20 grid place-items-center bg-black/50 text-pink-200"><FaSpinner className="animate-spin text-2xl" /></span>}
                        </div>

                        <div className="mt-6 w-full max-w-xl text-center">
                            <h2 className="truncate text-2xl font-black tracking-tight text-white sm:text-3xl">{song.title}</h2>
                            <p className="mt-1 truncate text-sm text-cyan-200/75 sm:text-base">{song.artist}{song.album ? ` · ${song.album}` : ""}</p>
                        </div>

                        <div className="mt-6 flex w-full max-w-xl items-center gap-3 text-xs text-white/50">
                            <span>{formatTime(currentTime)}</span>
                            <input aria-label="Song progress" type="range" min="0" max={duration || 1} value={currentTime} onChange={(event) => { const value = Number(event.target.value); player?.seekTo(value, true); setCurrentTime(value); }} className="player-range flex-1" />
                            <span>{formatTime(duration)}</span>
                        </div>

                        <div className="mt-5 flex items-center justify-center gap-4 text-white sm:gap-6">
                            <button onClick={previousSong} disabled={currentIndex <= 0} className="player-icon-button" aria-label="Previous song"><FaStepBackward /></button>
                            <button onClick={togglePlayback} className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-pink-400 via-fuchsia-500 to-violet-600 text-xl shadow-[0_0_32px_rgba(236,72,153,0.58)] transition hover:scale-105" aria-label={playing ? "Pause" : "Play"}>
                                {playing ? <FaPause /> : <FaPlay className="ml-1" />}
                            </button>
                            <button onClick={nextSong} disabled={currentIndex < 0 || currentIndex >= songs.length - 1} className="player-icon-button" aria-label="Next song"><FaStepForward /></button>
                            {expanded && <label className="ml-1 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white/70"><FaVolumeUp /><input aria-label="Volume" type="range" min="0" max="100" value={settings.volume} onChange={(event) => updateSettings({ volume: Number(event.target.value) })} className="player-range w-20 sm:w-28" /></label>}
                        </div>

                        {!expanded && <div className="mt-6 flex items-center justify-center gap-3 text-white/60">
                            <FaVolumeUp />
                            <input aria-label="Volume" type="range" min="0" max="100" value={settings.volume} onChange={(event) => updateSettings({ volume: Number(event.target.value) })} className="player-range w-32" />
                            <button className="ml-2 text-pink-300 transition hover:text-pink-100" aria-label="Like song"><FaHeart /></button>
                        </div>}
                    </div>

                    {showQueue && (
                        <aside className={`queue-panel ${expanded ? "lg:col-start-2" : "mt-6"}`}>
                            <div className="mb-3 flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-300">Your queue</p><h3 className="text-lg font-bold text-white">Up next</h3></div><span className="rounded-full bg-white/10 px-2 py-1 text-xs text-white/50">{songs.length}</span></div>
                            <div className="max-h-60 space-y-2 overflow-y-auto pr-1 lg:max-h-[58vh]">
                                {songs.length ? songs.map((item, index) => <button key={item.id} onClick={() => setCurrentSong(item)} className={`queue-song ${item.id === song.id ? "queue-song-current" : ""}`}><span className="w-5 text-center text-xs text-white/40">{item.id === song.id && playing ? "♫" : index + 1}</span><img src={item.thumbnail || "https://placehold.co/80x80"} alt="" className="h-9 w-9 rounded-md object-cover"/><span className="min-w-0 flex-1 text-left"><span className="block truncate text-sm font-medium text-white">{item.title}</span><span className="block truncate text-xs text-white/45">{item.artist}</span></span></button>) : <p className="py-8 text-center text-sm text-white/45">Your queue is empty.</p>}
                            </div>
                        </aside>
                    )}
                </div>
            </div>

        </section>
    );
}

export default Player;

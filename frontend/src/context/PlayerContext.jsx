import { createContext, useContext, useMemo, useState } from "react";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
    const [currentSong, setCurrentSong] = useState(null);
    const [queue, setQueue] = useState([]);

    const value = useMemo(
        () => ({ currentSong, setCurrentSong, queue, setQueue }),
        [currentSong, queue]
    );

    return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
    return useContext(PlayerContext);
}

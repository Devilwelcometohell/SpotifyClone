export const satinderSartaajSongs = [
    ["udaarian", "Udaarian", "Seasons of Sartaaj", "I3gEoz8JDRE"],
    ["titli", "Titli", "Titli", "FJDnVfOGRAM"],
    ["sajjan-raazi", "Sajjan Raazi", "Sajjan Raazi"],
    ["jalsa-2", "Jalsa 2.0", "Mission Raniganj", "g59eKPiQfEs"],
    ["aalam-aara", "Aalam-Aara", "Aalam-Aara · 2025", "ptPnj5tB-mU"],
    ["jaiye-sajana", "Jaiye Sajana", "Jaiye Sajana · 2026"],
    ["zafarnama", "Zafarnama", "Zafarnama · 2026"],
    ["rutba", "Rutba", "Travel Diaries"],
    ["pyaar-tere-naal", "Pyaar Tere Naal", "Pyaar Tere Naal"],
    ["motiya", "Motiya", "Seasons of Sartaaj"],
    ["heeriye-fakira", "Heeriye Fakira", "Seasons of Sartaaj"],
].map(([id, title, album, videoId]) => ({
    id: `satinder-sartaaj-${id}`,
    title,
    artist: "Satinder Sartaaj",
    album,
    genre: "Punjabi Folk",
    videoId,
    thumbnail: videoId
        ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
        : undefined,
}));

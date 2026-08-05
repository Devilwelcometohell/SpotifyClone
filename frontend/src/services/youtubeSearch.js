export async function searchYoutube(song) {

    const query = `${song.title} ${song.artist}`;

    // Open YouTube search results in a new tab if needed
    const searchUrl =
        `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

    return searchUrl;
}
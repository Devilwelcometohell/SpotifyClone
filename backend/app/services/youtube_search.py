from yt_dlp import YoutubeDL


def search_youtube(song: str, artist: str):
    search_terms = []

    if song:
        search_terms.append(song.strip())
    if artist:
        search_terms.append(artist.strip())

    queries = []
    if search_terms:
        queries.append(" ".join(search_terms))
        queries.append(song.strip() if song else "")
        queries.append(artist.strip() if artist else "")

    ydl_opts = {
        "quiet": True,
        "skip_download": True,
        "extract_flat": True,
    }

    for query in queries:
        if not query:
            continue

        try:
            with YoutubeDL(ydl_opts) as ydl:
                result = ydl.extract_info(
                    f"ytsearch1:{query}",
                    download=False,
                )

            entries = result.get("entries") or []
            if entries:
                video = entries[0]
                return {
                    "videoId": video["id"],
                    "title": video.get("title"),
                    "query": query,
                }
        except Exception:
            continue

    return {"error": "Video not found"}
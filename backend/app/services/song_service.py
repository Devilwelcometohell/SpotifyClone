from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.models.song import Song
from yt_dlp import YoutubeDL


FEATURED_SEARCH_SONGS = [
    {
        "id": "youtube-I3gEoz8JDRE", "title": "Udaarian", "artist": "Satinder Sartaaj",
        "album": "Seasons of Sartaaj", "genre": "Punjabi", "videoId": "I3gEoz8JDRE",
    },
    {
        "id": "youtube-FJDnVfOGRAM", "title": "Titli", "artist": "Satinder Sartaaj",
        "album": "Titli", "genre": "Punjabi", "videoId": "FJDnVfOGRAM",
    },
    {
        "id": "youtube-g59eKPiQfEs", "title": "Jalsa 2.0", "artist": "Satinder Sartaaj",
        "album": "Mission Raniganj", "genre": "Punjabi", "videoId": "g59eKPiQfEs",
    },
    {
        "id": "youtube-NIsWQ2z7q6I", "title": "Rutba", "artist": "Satinder Sartaaj",
        "album": "Kali Jotta", "genre": "Punjabi", "videoId": "NIsWQ2z7q6I",
    },
    {
        "id": "youtube-ptPnj5tB-mU", "title": "Aalam-Aara", "artist": "Satinder Sartaaj",
        "album": "Aalam-Aara", "genre": "Punjabi", "videoId": "ptPnj5tB-mU",
    },
    {
        "id": "youtube-dNvqJIeHPis", "title": "Ishq Di Baajiyaan", "artist": "Diljit Dosanjh",
        "album": "Soorma", "genre": "Bollywood", "videoId": "dNvqJIeHPis",
    },
]


def featured_search_songs(query: str):
    terms = query.lower().strip()
    matches = []
    for song in FEATURED_SEARCH_SONGS:
        searchable = f"{song['title']} {song['artist']} {song['album']}".lower()
        if terms and (terms in searchable or searchable.startswith(terms)):
            item = song.copy()
            item["thumbnail"] = f"https://i.ytimg.com/vi/{item['videoId']}/hqdefault.jpg"
            matches.append(item)
    return matches


def get_all_songs(db: Session):
    return db.query(Song).all()


def search_song(db: Session, query: str):
    search_term = f"%{query.strip()}%"
    return (
        db.query(Song)
        .filter(
            or_(
                Song.title.ilike(search_term),
                Song.artist.ilike(search_term),
                Song.album.ilike(search_term),
            )
        )
        .order_by(Song.popularity.desc())
        .limit(50)
        .all()
    )


def search_live_songs(query: str, limit: int = 18):
    """Return current YouTube matches with their native video thumbnails."""
    cleaned_query = query.strip()
    if not cleaned_query:
        return []

    options = {
        "quiet": True,
        "skip_download": True,
        "extract_flat": True,
        "noplaylist": True,
        "socket_timeout": 8,
        "extractor_retries": 0,
    }

    try:
        with YoutubeDL(options) as ydl:
            result = ydl.extract_info(f"ytsearch{limit}:{cleaned_query}", download=False)
    except Exception:
        return []

    songs = []
    for entry in result.get("entries") or []:
        video_id = entry.get("id")
        if not video_id:
            continue

        artist = entry.get("uploader") or entry.get("channel") or "YouTube"
        songs.append({
            "id": f"youtube-{video_id}",
            "title": entry.get("title") or "Untitled track",
            "artist": artist,
            "album": entry.get("channel") or artist,
            "genre": "YouTube",
            "thumbnail": f"https://i.ytimg.com/vi/{video_id}/hqdefault.jpg",
            "videoId": video_id,
        })

    return songs

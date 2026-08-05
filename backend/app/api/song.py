from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.services.song_service import featured_search_songs, get_all_songs, search_live_songs, search_song

router = APIRouter(
    prefix="/songs",
    tags=["Songs"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def all_songs(db: Session = Depends(get_db)):
    return get_all_songs(db)


@router.get("/search")
def search(query: str, db: Session = Depends(get_db)):
    # Merge live, featured, and local results so an unavailable external provider
    # never reduces a search to the tiny local seed database.
    live_results = search_live_songs(query)
    featured_results = featured_search_songs(query)
    local_results = search_song(db, query)

    merged = []
    seen = set()
    for song in [*live_results, *featured_results, *local_results]:
        song_id = song["id"] if isinstance(song, dict) else song.id
        if song_id in seen:
            continue
        seen.add(song_id)
        merged.append(song)

    return merged

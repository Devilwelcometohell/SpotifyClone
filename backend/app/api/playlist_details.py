from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.playlist_song import PlaylistSong
from app.models.song import Song

router = APIRouter(
    prefix="/playlist-details",
    tags=["Playlist Details"]
)


@router.get("/{playlist_id}")
def get_playlist_details(
    playlist_id: int,
    db: Session = Depends(get_db)
):

    songs = (
        db.query(Song)
        .join(
            PlaylistSong,
            Song.id == PlaylistSong.song_id
        )
        .filter(
            PlaylistSong.playlist_id == playlist_id
        )
        .all()
    )

    for song in songs:
        if not song.thumbnail:
            song.thumbnail = "https://placehold.co/200x200?text=Music"

    return songs
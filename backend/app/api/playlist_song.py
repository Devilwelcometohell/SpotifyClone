from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.playlist_song import PlaylistSong
from app.schemas.playlist_song import PlaylistSongCreate
from app.models.song import Song

router = APIRouter(
    prefix="/playlist-song",
    tags=["Playlist Songs"]
)


@router.post("/add")
def add_song(
    song: PlaylistSongCreate,
    db: Session = Depends(get_db)
):

    exists = db.query(PlaylistSong).filter(
        PlaylistSong.playlist_id == song.playlist_id,
        PlaylistSong.song_id == song.song_id
    ).first()

    if exists:
        raise HTTPException(
            status_code=400,
            detail="Song already exists in playlist"
        )

    new_song = PlaylistSong(
        playlist_id=song.playlist_id,
        song_id=song.song_id
    )

    db.add(new_song)
    db.commit()
    db.refresh(new_song)

    return new_song


@router.get("/{playlist_id}")
def get_playlist_songs(
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

    return songs


@router.delete("/{id}")
def delete_song(
    id: int,
    db: Session = Depends(get_db)
):

    song = db.query(PlaylistSong).filter(
        PlaylistSong.id == id
    ).first()

    if not song:
        raise HTTPException(
            status_code=404,
            detail="Song not found"
        )

    db.delete(song)
    db.commit()

    return {"message": "Song removed"}
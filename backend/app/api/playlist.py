from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.playlist import Playlist
from app.schemas.playlist import PlaylistCreate

router = APIRouter(
    prefix="/playlist",
    tags=["Playlist"]
)


@router.post("/create")
def create_playlist(
    playlist: PlaylistCreate,
    db: Session = Depends(get_db)
):

    new_playlist = Playlist(
        name=playlist.name,
        user_id=playlist.user_id
    )

    db.add(new_playlist)
    db.commit()
    db.refresh(new_playlist)

    return new_playlist


@router.get("/{user_id}")
def get_playlists(
    user_id: int,
    db: Session = Depends(get_db)
):

    playlists = db.query(Playlist).filter(
        Playlist.user_id == user_id
    ).all()

    return playlists


@router.delete("/{playlist_id}")
def delete_playlist(
    playlist_id: int,
    db: Session = Depends(get_db)
):

    playlist = db.query(Playlist).filter(
        Playlist.id == playlist_id
    ).first()

    if not playlist:
        raise HTTPException(
            status_code=404,
            detail="Playlist not found"
        )

    db.delete(playlist)
    db.commit()

    return {"message": "Playlist deleted"}
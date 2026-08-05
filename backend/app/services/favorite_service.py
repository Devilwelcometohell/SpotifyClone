from sqlalchemy.orm import Session

from app.models.favorite import Favorite
from app.models.song import Song


def add_favorite(db: Session, user_id: int, song_id: int):

    existing = db.query(Favorite).filter(
        Favorite.user_id == user_id,
        Favorite.song_id == song_id
    ).first()

    if existing:
        return {"message": "Already Favorite"}

    favorite = Favorite(
        user_id=user_id,
        song_id=song_id
    )

    db.add(favorite)
    db.commit()
    db.refresh(favorite)

    return favorite


def get_favorites(db: Session, user_id: int):

    favorites = (
        db.query(Song)
        .join(Favorite, Song.id == Favorite.song_id)
        .filter(Favorite.user_id == user_id)
        .all()
    )

    return favorites


def remove_favorite(db: Session, user_id: int, song_id: int):

    favorite = db.query(Favorite).filter(
        Favorite.user_id == user_id,
        Favorite.song_id == song_id
    ).first()

    if favorite:
        db.delete(favorite)
        db.commit()

    return {
        "message": "Removed"
    }
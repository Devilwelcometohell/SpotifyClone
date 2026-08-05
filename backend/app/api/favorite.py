from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import SessionLocal

from app.services.favorite_service import (
    add_favorite,
    get_favorites,
    remove_favorite
)

router = APIRouter(
    prefix="/favorites",
    tags=["Favorites"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def create_favorite(
    user_id: int,
    song_id: int,
    db: Session = Depends(get_db)
):
    return add_favorite(db, user_id, song_id)


@router.get("/")
def all_favorites(
    user_id: int,
    db: Session = Depends(get_db)
):
    return get_favorites(db, user_id)


@router.delete("/")
def delete_favorite(
    user_id: int,
    song_id: int,
    db: Session = Depends(get_db)
):
    return remove_favorite(db, user_id, song_id)
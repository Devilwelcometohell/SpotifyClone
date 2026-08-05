from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.song import Song

from app.core.database import get_db
from app.models.history import History
from app.schemas.history import HistoryCreate

router = APIRouter(
    prefix="/history",
    tags=["History"]
)


@router.post("/add")
def add_history(
    history: HistoryCreate,
    db: Session = Depends(get_db)
):

    new_history = History(
        user_id=history.user_id,
        song_id=history.song_id
    )

    db.add(new_history)
    db.commit()
    db.refresh(new_history)

    return new_history


@router.get("/{user_id}")
def get_history(
    user_id: int,
    db: Session = Depends(get_db)
):

    songs = (
        db.query(Song)
        .join(History, Song.id == History.song_id)
        .filter(History.user_id == user_id)
        .order_by(History.id.desc())
        .all()
    )

    return songs
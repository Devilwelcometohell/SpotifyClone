from fastapi import APIRouter

from app.services.youtube_search import search_youtube

router = APIRouter(
    prefix="/player",
    tags=["Player"]
)


@router.get("/play")
def play(song: str, artist: str):

    return search_youtube(song, artist)
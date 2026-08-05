from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models.favorite import Favorite
from app.models.playlist import Playlist
from app.models.playlist_song import PlaylistSong
from app.models.history import History

from app.models.song import Song
from app.api.profile import router as profile_router
from app.api.song import router as song_router
from app.api.player import router as player_router
from app.api.favorite import router as favorite_router
from app.api.playlist import router as playlist_router
from app.api.playlist_song import router as playlist_song_router
from app.api.playlist_details import router as playlist_details_router
from app.api.history import router as history_router

from app.api.auth import router as auth_router

from app.core.database import Base, engine
from app.core.config import ALLOWED_ORIGINS

# Import models so SQLAlchemy knows about them
from app.models.user import User

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="DevilBeats API",
    version="1.0.0"
)

# ---------------- CORS ----------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------- Routers ----------------

app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(song_router)
app.include_router(player_router)
app.include_router(favorite_router)
app.include_router(playlist_router)
app.include_router(playlist_song_router)
app.include_router(playlist_details_router)
app.include_router(history_router)



# -------------- Routes -----------------

@app.get("/")
def home():
    return {
        "message": "Welcome to DevilBeats API"
    }


@app.get("/health")
def health():
    return {
        "status": "Backend Running Successfully"
    }

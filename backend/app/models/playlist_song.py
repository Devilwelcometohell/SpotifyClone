from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class PlaylistSong(Base):

    __tablename__ = "playlist_songs"

    id = Column(Integer, primary_key=True)

    playlist_id = Column(
        Integer,
        ForeignKey("playlists.id")
    )

    song_id = Column(
        Integer,
        ForeignKey("songs.id")
    )

    playlist = relationship(
        "Playlist",
        back_populates="songs"
    )

    song = relationship("Song")
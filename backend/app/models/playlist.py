from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class Playlist(Base):

    __tablename__ = "playlists"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)

    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User")

    songs = relationship(
        "PlaylistSong",
        back_populates="playlist",
        cascade="all, delete"
    )
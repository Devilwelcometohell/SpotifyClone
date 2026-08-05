from sqlalchemy import Column, Integer, String

from app.core.database import Base


class Song(Base):

    __tablename__ = "songs"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(255), index=True)

    artist = Column(String(255), index=True)

    album = Column(String(255))

    genre = Column(String(100), index=True)

    thumbnail = Column(String(500))

    youtube_id = Column(String(100))

    popularity = Column(Integer)

    duration = Column(Integer)
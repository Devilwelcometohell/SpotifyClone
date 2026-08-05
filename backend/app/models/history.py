from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class History(Base):

    __tablename__ = "history"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    song_id = Column(Integer, ForeignKey("songs.id"))

    user = relationship("User")

    song = relationship("Song")
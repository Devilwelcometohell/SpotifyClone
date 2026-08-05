from pydantic import BaseModel


class PlaylistSongCreate(BaseModel):
    playlist_id: int
    song_id: int


class PlaylistSongResponse(BaseModel):
    id: int
    playlist_id: int
    song_id: int

    class Config:
        from_attributes = True
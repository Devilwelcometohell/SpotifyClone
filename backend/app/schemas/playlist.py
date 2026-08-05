from pydantic import BaseModel


class PlaylistCreate(BaseModel):
    name: str
    user_id: int


class PlaylistResponse(BaseModel):
    id: int
    name: str
    user_id: int

    class Config:
        from_attributes = True
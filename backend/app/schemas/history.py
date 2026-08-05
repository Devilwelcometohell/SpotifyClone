from pydantic import BaseModel


class HistoryCreate(BaseModel):
    user_id: int
    song_id: int


class HistoryResponse(BaseModel):
    id: int
    user_id: int
    song_id: int

    class Config:
        from_attributes = True
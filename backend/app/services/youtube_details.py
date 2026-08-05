import httpx

from app.core.config import YOUTUBE_API_KEY

DETAIL_URL = "https://www.googleapis.com/youtube/v3/videos"


async def get_video_details(video_ids):

    params = {
        "part": "snippet,contentDetails,statistics",
        "id": ",".join(video_ids),
        "key": YOUTUBE_API_KEY,
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(DETAIL_URL, params=params)

    response.raise_for_status()

    return response.json()
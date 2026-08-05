import httpx

from app.core.config import YOUTUBE_API_KEY
from app.utils.duration import format_duration
from app.utils.formatter import format_views

VIDEO_URL = "https://www.googleapis.com/youtube/v3/videos"


async def get_video(video_id: str):

    params = {
        "part": "snippet,statistics,contentDetails",
        "id": video_id,
        "key": YOUTUBE_API_KEY,
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(VIDEO_URL, params=params)

    response.raise_for_status()

    data = response.json()

    if len(data["items"]) == 0:
        return {"error": "Video not found"}

    item = data["items"][0]

    return {
        "videoId": video_id,
        "title": item["snippet"]["title"],
        "channel": item["snippet"]["channelTitle"],
        "description": item["snippet"]["description"],
        "thumbnail": item["snippet"]["thumbnails"]["high"]["url"],
        "publishedAt": item["snippet"]["publishedAt"][:10],
        "duration": format_duration(
            item["contentDetails"]["duration"]
        ),
        "views": format_views(
            item["statistics"]["viewCount"]
        ),
    }
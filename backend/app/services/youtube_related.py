import httpx

from app.core.config import YOUTUBE_API_KEY

SEARCH_URL = "https://www.googleapis.com/youtube/v3/search"


async def get_related(query: str):

    params = {
        "part": "snippet",
        "q": query,
        "type": "video",
        "videoCategoryId": "10",
        "maxResults": 10,
        "key": YOUTUBE_API_KEY,
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(
            SEARCH_URL,
            params=params,
        )

    response.raise_for_status()

    data = response.json()

    songs = []

    for item in data["items"]:

        songs.append({
            "title": item["snippet"]["title"],
            "channel": item["snippet"]["channelTitle"],
            "videoId": item["id"]["videoId"],
            "thumbnail": item["snippet"]["thumbnails"]["high"]["url"],
        })

    return songs
from app.services.youtube_search import youtube_search
from app.services.youtube_details import get_video_details

from app.utils.duration import format_duration
from app.utils.formatter import format_views


async def search_youtube(query: str):

    search = await youtube_search(query)

    songs = []

    for item in search["items"]:

        title = item["snippet"]["title"]
        channel = item["snippet"]["channelTitle"]

        score = 0

        title_lower = title.lower()
        channel_lower = channel.lower()

        if "official" in title_lower:
            score += 100

        if "vevo" in channel_lower:
            score += 80

        if "topic" in channel_lower:
            score += 60

        if "audio" in title_lower:
            score += 70

        if "lyrics" in title_lower:
            score -= 100

        if "live" in title_lower:
            score -= 60

        if "cover" in title_lower:
            score -= 50

        if "karaoke" in title_lower:
            score -= 100

        songs.append({
            "title": title,
            "channel": channel,
            "videoId": item["id"]["videoId"],
            "thumbnail": item["snippet"]["thumbnails"]["high"]["url"],
            "score": score,
        })

    songs.sort(
        key=lambda x: x["score"],
        reverse=True,
    )

    video_ids = [song["videoId"] for song in songs]

    details = await get_video_details(video_ids)

    detail_map = {
        item["id"]: item
        for item in details["items"]
    }

    final_results = []

    for song in songs:

        detail = detail_map.get(song["videoId"])

        if not detail:
            continue

        final_results.append({
            "title": song["title"],
            "channel": song["channel"],
            "videoId": song["videoId"],
            "thumbnail": song["thumbnail"],
            "duration": format_duration(
                detail["contentDetails"]["duration"]
            ),
            "views": format_views(
                detail["statistics"]["viewCount"]
            ),
            "publishedAt": detail["snippet"]["publishedAt"][:10],
            "score": song["score"],
        })

    return final_results
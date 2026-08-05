# from fastapi import APIRouter

# from app.services.youtube_video import get_video
# from app.services.youtube_service import search_youtube
# from app.services.youtube_related import get_related

# router = APIRouter(
#     prefix="/youtube",
#     tags=["YouTube"],
# )


# @router.get("/search")
# async def search(query: str):

#     return await search_youtube(query)

# @router.get("/video/{video_id}")
# async def video(video_id: str):

#     return await get_video(video_id)
# @router.get("/related")
# async def related(query: str):

#     return await get_related(query)
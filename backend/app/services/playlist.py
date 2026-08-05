playlists = []

def get_playlists():
    return playlists

def create_playlist(name: str):
    playlist = {
        "id": len(playlists) + 1,
        "name": name,
        "songs": []
    }

    playlists.append(playlist)

    return playlist

def delete_playlist(id: int):

    global playlists

    playlists = [
        p for p in playlists
        if p["id"] != id
    ]

    return {"message": "Playlist deleted"}
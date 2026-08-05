import pandas as pd
from tqdm import tqdm

import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.database import SessionLocal
from app.models.song import Song

CSV_FILE = "importer/dataset.csv"

db = SessionLocal()

print("Reading CSV...")

df = pd.read_csv(CSV_FILE)

print(f"Found {len(df)} songs")

# Remove duplicate songs
df = df.drop_duplicates(subset=["track_name", "artists"])

print(f"After removing duplicates: {len(df)} songs")

songs = []

for _, row in tqdm(df.iterrows(), total=len(df)):

    song = Song(
        title=str(row["track_name"]),
        artist=str(row["artists"]),
        album=str(row["album_name"]),
        genre=str(row["track_genre"]),
        popularity=int(row["popularity"]),
        duration=int(row["duration_ms"]),
        thumbnail="",
        youtube_id=""
    )

    songs.append(song)

BATCH_SIZE = 1000

for i in tqdm(range(0, len(songs), BATCH_SIZE)):

    db.bulk_save_objects(songs[i:i+BATCH_SIZE])
    db.commit()

db.close()

print("===================================")
print("Import Completed Successfully")
print(f"Songs Imported : {len(songs)}")
print("===================================")
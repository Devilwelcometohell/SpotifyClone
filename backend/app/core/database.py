from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import importlib.util
import os

if os.getenv("RENDER") is None:
    load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL") or "sqlite:///./devilbeats.db"

if DATABASE_URL.startswith("postgres") and importlib.util.find_spec("psycopg2") is None:
    DATABASE_URL = "sqlite:///./devilbeats.db"

if DATABASE_URL.startswith("postgres"):
    engine = create_engine(DATABASE_URL)
else:
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(
    autoflush=False,
    autocommit=False,
    bind=engine
)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

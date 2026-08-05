from app.schemas.user import UserLogin, Token
from app.core.security import verify_password, create_access_token
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import Base, engine, get_db
from app.core.security import hash_password
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse

router = APIRouter(tags=["Authentication"])

Base.metadata.create_all(bind=engine)


@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    try:
        existing_email = db.query(User).filter(User.email == user.email).first()

        if existing_email:
            raise HTTPException(
                status_code=400,
                detail="Email already registered"
            )

        existing_username = db.query(User).filter(User.username == user.username).first()

        if existing_username:
            raise HTTPException(
                status_code=400,
                detail="Username already exists"
            )

        new_user = User(
            username=user.username,
            email=user.email,
            password=hash_password(user.password)
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return new_user
    except HTTPException:
        db.rollback()
        raise
    except Exception as exc:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):

    # Find user by email
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # Verify password
    if not verify_password(user.password, db_user.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # Generate JWT token
    token = create_access_token(
        {"sub": db_user.email}
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "username": db_user.username,
            "email": db_user.email,
        }
    }
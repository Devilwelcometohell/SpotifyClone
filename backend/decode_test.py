from jose import jwt

from app.core.config import SECRET_KEY, ALGORITHM

token = input("Enter Token: ")

payload = jwt.decode(
    token,
    SECRET_KEY,
    algorithms=[ALGORITHM]
)

print(payload)
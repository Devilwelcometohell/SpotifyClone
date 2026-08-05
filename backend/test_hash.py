from app.core.security import hash_password, verify_password

password = "devang123"

hashed = hash_password(password)

print("Original Password :", password)
print("Hashed Password   :", hashed)

print("Verification :", verify_password(password, hashed))
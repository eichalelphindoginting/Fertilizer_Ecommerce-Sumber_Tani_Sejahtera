import jwt
import datetime
from passlib.context import CryptContext

JWT_SECRET_KEY = "your-super-secret-jwt-key" # GANTI INI DENGAN KUNCI YANG KUAT!
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_DELTA_MINUTES = 30 # Token berlaku selama 30 menit

def hash_password(password: str) -> str:
    # Jika pwd_context didefinisikan di user.py, import dari sana
    from .models.user import pwd_context as user_pwd_context
    return user_pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    from .models.user import pwd_context as user_pwd_context
    return user_pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: datetime.timedelta = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.datetime.utcnow() + expires_delta
    else:
        expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=JWT_EXPIRATION_DELTA_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    return encoded_jwt
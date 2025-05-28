import datetime
from sqlalchemy import Column, Integer, String, DateTime
from .meta import Base
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    def verify_password(self, plain_password):
        return pwd_context.verify(plain_password, self.hashed_password)
    def set_password(self, plain_password):
        self.hashed_password = pwd_context.hash(plain_password)
    def __repr__(self):
        return f"<User(username='{self.username}', email='{self.email}')>"

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)
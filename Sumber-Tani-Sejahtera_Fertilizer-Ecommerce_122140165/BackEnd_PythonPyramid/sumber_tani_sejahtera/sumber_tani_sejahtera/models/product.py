from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Numeric,
    DateTime,
    ForeignKey # Jika Anda akan membuat model Category terpisah
)
from sqlalchemy.orm import relationship # Jika ada relasi
from sqlalchemy.sql import func # Untuk default timestamp

from .meta import Base # Menggunakan Base dari models.meta

class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=True)
    price = Column(Numeric(10, 2), nullable=False) # Contoh: 10 digit total, 2 digit desimal
    stock = Column(Integer, nullable=False, default=0)
    category_name = Column(String(100), nullable=True, index=True) # Untuk sementara, idealnya ForeignKey ke tabel Category
    # category_id = Column(Integer, ForeignKey('categories.id')) # Contoh jika ada tabel 'categories'
    # category = relationship("Category", back_populates="products") # Contoh relasi
    image_url = Column(String(500), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def to_dict(self):
        """Mengembalikan representasi dictionary dari model."""
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": float(self.price) if self.price is not None else None, # Konversi Numeric ke float untuk JSON
            "stock": self.stock,
            "category_name": self.category_name,
            "image_url": self.image_url,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
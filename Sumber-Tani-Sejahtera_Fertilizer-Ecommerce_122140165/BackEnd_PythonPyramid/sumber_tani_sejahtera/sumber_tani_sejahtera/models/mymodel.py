from sqlalchemy import (
    Column,
    Index,
    Integer,
    Text,
)

from .meta import Base


class MyModel(Base):
    __tablename__ = 'models' # Anda mungkin ingin mengubah nama tabel ini menjadi 'mymodels' atau nama lain yang lebih spesifik
    id = Column(Integer, primary_key=True)
    name = Column(Text)
    value = Column(Integer)


# Baris `from .mymodel import MyModel` yang menyebabkan error telah dihapus.
# Definisi Index di bawah ini sudah benar karena MyModel didefinisikan di atasnya dalam file yang sama.
Index('my_index', MyModel.name, unique=True, mysql_length=255)
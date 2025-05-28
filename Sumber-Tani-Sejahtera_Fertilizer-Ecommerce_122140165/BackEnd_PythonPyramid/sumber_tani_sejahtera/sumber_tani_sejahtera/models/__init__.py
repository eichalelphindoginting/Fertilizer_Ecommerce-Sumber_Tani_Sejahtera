# File: sumber_tani_sejahtera/models/__init__.py

from sqlalchemy.orm import sessionmaker, scoped_session
from zope.sqlalchemy import register # Untuk pyramid_tm

# Impor Base dari meta.py agar bisa diekspor dari package models
from .meta import Base
# Impor model-model Anda agar mudah diakses dan terdaftar di metadata Base
from .user import User
# ... impor model lain jika ada ...
from .mymodel import MyModel # <--- PERBAIKAN DI SINI

# DBSession adalah scoped_session agar thread-safe
# Konfigurasi bind akan dilakukan di __init__.py utama aplikasi
DBSession = scoped_session(sessionmaker())
register(DBSession) # Untuk integrasi dengan pyramid_tm (transaction manager)

def includeme(config):
    """
    Fungsi includeme untuk paket models.
    Saat ini mungkin tidak melakukan apa-apa,
    tetapi memungkinkan config.include('.models') bekerja.
    """
    # Anda bisa menambahkan konfigurasi spesifik model di sini jika perlu di masa depan
    # Misalnya, config.add_request_method(...) untuk sesuatu yang terkait model
    pass

# Opsional: Anda bisa juga mendefinisikan fungsi initialize_sql di sini jika mau
# yang dipanggil dari __init__.py utama aplikasi            
# File: sumber_tani_sejahtera/__init__.py
import pyramid.tweens 
from pyramid.config import Configurator
from sqlalchemy import engine_from_config
from .models import DBSession
from .models.meta import Base
from . import models
from pyramid.renderers import JSON

# Path ke tween CORS Anda
CORS_TWEEN_FACTORY = 'sumber_tani_sejahtera.cors_tween.cors_tween_factory'

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine

    config = Configurator(settings=settings)

    # --- Konfigurasi CORS Manual Menggunakan Tween ---
    # Hapus atau komentari baris include pyramid_cors jika ada
    # config.include('pyramid_cors')
    # config.add_cors_preflight_handler()

    # Daftarkan tween CORS Anda. Pastikan path-nya benar.
    # Tambahkan SEBELUM EXCVIEW_TWEEN untuk menangani error juga.
    config.add_tween(CORS_TWEEN_FACTORY, under=pyramid.tweens.EXCVIEW)
    # Atau jika Anda ingin lebih eksplisit tentang posisi:
    # config.add_tween('sumber_tani_sejahtera.cors_tween.cors_tween_factory',
    #                  under='pyramid.tweens.excview_tween_factory')


    config.include('pyramid_jinja2') # Jika Anda menggunakannya
    # config.include('pyramid_tm') # Sangat direkomendasikan

    config.include('.routes')
    config.scan('.views')

    json_renderer = JSON()
    config.add_renderer('json', json_renderer)

    return config.make_wsgi_app()
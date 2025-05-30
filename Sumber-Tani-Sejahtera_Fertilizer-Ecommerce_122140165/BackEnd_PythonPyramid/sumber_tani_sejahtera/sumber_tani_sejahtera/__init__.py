import pyramid.tweens 
from pyramid.config import Configurator
from sqlalchemy import engine_from_config
from .models import DBSession
from .models.meta import Base
from . import models
from pyramid.renderers import JSON
from .models.mymodel import MyModel

CORS_TWEEN_FACTORY = 'sumber_tani_sejahtera.cors_tween.cors_tween_factory'

def main(global_config, **settings):
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine

    config = Configurator(settings=settings)
    config.add_tween(CORS_TWEEN_FACTORY, under=pyramid.tweens.EXCVIEW)
    config.include('pyramid_jinja2') 

    config.include('.routes')
    config.scan('.views')

    json_renderer = JSON()
    config.add_renderer('json', json_renderer)
    config.add_route('api_login', '/api/login')
    config.add_route('api_register', '/api/register')
    config.add_route('api_user', '/api/user') # Pastikan ini juga ada jika Anda menggunakan route_name 'api_user'
    config.add_route('api_list_users', '/api/users')
    config.add_route('api_products_collection', '/api/products')
    config.add_route('api_product_item', '/api/products/{product_id}')

    return config.make_wsgi_app()
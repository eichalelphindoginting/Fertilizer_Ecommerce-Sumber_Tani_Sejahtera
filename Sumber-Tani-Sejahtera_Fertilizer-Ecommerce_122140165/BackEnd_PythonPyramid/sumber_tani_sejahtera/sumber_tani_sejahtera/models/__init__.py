from sqlalchemy.orm import sessionmaker, scoped_session
from zope.sqlalchemy import register 
from .meta import Base
from .user import User
# from .mymodel import MyModel 
from .product import Product

DBSession = scoped_session(sessionmaker())
register(DBSession) 

def includeme(config):
    pass

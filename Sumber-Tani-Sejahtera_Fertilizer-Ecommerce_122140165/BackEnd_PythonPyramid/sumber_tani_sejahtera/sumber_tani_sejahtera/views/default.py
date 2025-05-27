from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy import engine_from_config
from pyramid.paster import get_appsettings
from ..models.user import User
import jwt
import datetime

SECRET_KEY = 'secret123'


        

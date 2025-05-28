from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy import engine_from_config
from pyramid.paster import get_appsettings
from ..models.user import User
import jwt
import datetime

SECRET_KEY = 'secret123'

@view_config(route_name='nama_route_anda', renderer='json') # atau renderer template
def my_view(request):
    # Logika view Anda di sini
    return {'project': 'Sumber_Tani_Sejahtera', 'status': 'ok'} 
        

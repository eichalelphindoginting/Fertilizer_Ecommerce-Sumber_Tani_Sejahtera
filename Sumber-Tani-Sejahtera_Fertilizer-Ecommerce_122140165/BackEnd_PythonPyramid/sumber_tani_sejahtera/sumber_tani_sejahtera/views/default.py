from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy import engine_from_config
from pyramid.paster import get_appsettings
from ..models.LoginModel import User
import jwt
import datetime

SECRET_KEY = 'secret123'

@view_config(route_name='login', request_method='POST', renderer='json')
def login_view(request):
    try:
        data = request.json_body
        username = data.get('username')
        password = data.get('password')

        # Setup session
        settings = request.registry.settings
        engine = engine_from_config(settings, 'sqlalchemy.')
        DBSession = scoped_session(sessionmaker(bind=engine))
        session = DBSession()

        user = session.query(User).filter_by(username=username, password=password).first()

        if user:
            payload = {
                'user_id': user.id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
            }
            token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
            return {
                'success': True,
                'token': token
            }
        else:
            return {
                'success': False,
                'message': 'Username atau password salah'
            }
    except Exception as e:
        return {
            'success': False,
            'message': f'Error: {str(e)}'
        }

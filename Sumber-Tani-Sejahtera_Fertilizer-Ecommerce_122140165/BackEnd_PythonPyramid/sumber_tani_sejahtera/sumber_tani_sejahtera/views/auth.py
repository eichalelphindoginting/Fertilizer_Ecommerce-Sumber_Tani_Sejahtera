from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import HTTPBadRequest, HTTPConflict, HTTPUnauthorized, HTTPOk
import sqlalchemy.exc
import transaction

from ..models.user import User
from ..models import DBSession # Asumsi DBSession di-setup di models/__init__.py atau __init__.py utama
from ..security import create_access_token, verify_password, hash_password # Menggunakan hash_password dari security.py

@view_config(route_name='home', renderer='templates/mytemplate.jinja2') # atau renderer='json'
def my_home_view(request):
    return {'project': 'sumber_tani_sejahtera'}

@view_config(route_name='api_user', renderer='json', request_method='GET')
def simple_api_user_view(request):
    return {'status': 'success', 'message': 'Endpoint /api/user aktif!'}

@view_config(route_name='api_register', request_method='POST', renderer='json')
def register_view(request):
    """
    View untuk registrasi pengguna baru.
    Menerima: username, email, password
    """
    try:
        json_body = request.json_body
        username = json_body.get('username')
        email = json_body.get('email')
        plain_password = json_body.get('password')

        if not all([username, email, plain_password]):
            raise HTTPBadRequest(json_body={'success': False, 'message': 'Username, email, dan password diperlukan.'})

        # Cek apakah username atau email sudah ada
        existing_user_by_username = DBSession.query(User).filter_by(username=username).first()
        if existing_user_by_username:
            raise HTTPConflict(json_body={'success': False, 'message': 'Username sudah digunakan.'})

        existing_user_by_email = DBSession.query(User).filter_by(email=email).first()
        if existing_user_by_email:
            raise HTTPConflict(json_body={'success': False, 'message': 'Email sudah terdaftar.'})

        new_user = User(username=username, email=email)
        new_user.set_password(plain_password) # Menggunakan metode set_password dari model User

        with transaction.manager:
            DBSession.add(new_user)
            DBSession.flush() # Untuk mendapatkan ID pengguna jika diperlukan untuk token

            # Frontend Anda mengharapkan user dan token jika auto-login
            # Jika tidak auto-login, cukup kembalikan pesan sukses
            # Untuk contoh ini, kita tidak auto-login, frontend akan ke halaman login
            # Jika ingin auto-login, generate token di sini:
            # access_token = create_access_token(data={"sub": new_user.username, "user_id": new_user.id})
            # user_data_for_frontend = {"id": new_user.id, "username": new_user.username, "email": new_user.email}
            # return {'success': True, 'message': 'Pendaftaran berhasil!', 'user': user_data_for_frontend, 'token': access_token}

        # Frontend akan redirect ke login page, jadi cukup pesan sukses
        # Response status 201 Created lebih cocok untuk resource baru
        request.response.status_code = 201
        return {'success': True, 'message': 'Pendaftaran berhasil! Silakan login.'}

    except HTTPBadRequest as e:
        request.response.status_code = e.status_code
        return e.json_body
    except HTTPConflict as e:
        request.response.status_code = e.status_code
        return e.json_body
    except Exception as e:
        request.log_exception(e) # Log error server
        request.response.status_code = 500
        return {'success': False, 'message': 'Terjadi kesalahan internal server saat pendaftaran.'}


@view_config(route_name='api_login', request_method='POST', renderer='json')
def login_view(request):
    try:
        json_body = request.json_body
        username = json_body.get('username') 
        plain_password = json_body.get('password')

        if not username or not plain_password:
            raise HTTPBadRequest(json_body={'success': False, 'message': 'Username dan password diperlukan.'})

        user = DBSession.query(User).filter_by(username=username).first()

        if user is None or not user.verify_password(plain_password):
            raise HTTPUnauthorized(json_body={'success': False, 'message': 'Username atau password salah.'})

        # Buat token JWT
        access_token = create_access_token(data={"sub": user.username, "user_id": user.id})
        
        # Data pengguna yang akan dikirim ke frontend
        user_data_for_frontend = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            # Jangan kirim hashed_password atau informasi sensitif lainnya
        }

        return {
            'success': True,
            'message': 'Login berhasil!',
            'token': access_token,
            'user': user_data_for_frontend # Sesuai ekspektasi frontend Anda
        }

    except HTTPBadRequest as e:
        request.response.status_code = e.status_code
        return e.json_body
    except HTTPUnauthorized as e:
        request.response.status_code = e.status_code
        return e.json_body
    except Exception as e:
        request.log_exception(e)
        request.response.status_code = 500
        return {'success': False, 'message': 'Terjadi kesalahan internal server saat login.'}
@view_config(route_name='api_list_users', request_method='GET', renderer='json')
def list_users_view(request):
    """
    View untuk menampilkan daftar semua pengguna terdaftar.
    """
    try:
        users = DBSession.query(User).all() # Mengambil semua data pengguna dari database
        user_list = []
        for user in users:
            user_data = {
                "id": user.id,
                "username": user.username,
                "email": user.email
                # Jangan sertakan password atau data sensitif lainnya
            }
            user_list.append(user_data)
        
        return {'success': True, 'users': user_list}

    except Exception as e:
        request.log_exception(e) # Log error server
        request.response.status_code = 500
        return {'success': False, 'message': 'Terjadi kesalahan internal server saat mengambil data pengguna.'}
# Tambahkan view untuk OPTIONS request jika diperlukan untuk CORS preflight
@view_config(route_name='api_register', request_method='OPTIONS', renderer='json')
@view_config(route_name='api_login', request_method='OPTIONS', renderer='json')
def preflight_view(request):
    # Header CORS akan ditambahkan oleh tween atau konfigurasi global
    # View ini hanya perlu mengembalikan respons OK agar preflight berhasil
    return HTTPOk()
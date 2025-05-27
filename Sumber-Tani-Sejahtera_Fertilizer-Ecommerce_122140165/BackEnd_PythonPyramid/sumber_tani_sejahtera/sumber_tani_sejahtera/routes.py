def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/') # Contoh rute home

    # Rute untuk API autentikasi
    config.add_route('api_register', '/api/register')
    config.add_route('api_login', '/api/login')
    config.add_route('api_user', '/api/user')
def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/') 

    config.add_route('api_register', '/api/register')
    config.add_route('api_login', '/api/login')
    config.add_route('api_user', '/api/user')
    config.add_route('api_product_item', '/api/products/{id}')
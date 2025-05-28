class CORSTweenFactory:
    def __init__(self, handler, registry):
        self.handler = handler
        self.registry = registry

    def __call__(self, request):
        # Logika untuk menangani Preflight (OPTIONS) request
        if request.method == 'OPTIONS':
            response = request.response

        response = self.handler(request)

        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true') 
        response.headers.add('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE, PATCH')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-XSRF-TOKEN')
        response.headers.add('Access-Control-Expose-Headers', 'Content-Length, X-JSON') 
        response.headers.add('Access-Control-Max-Age', '86400') 
        return response

def cors_tween_factory(handler, registry): 
    return CORSTweenFactory(handler, registry)
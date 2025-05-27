# File: sumber_tani_sejahtera/cors_tween.py

class CORSTweenFactory:
    def __init__(self, handler, registry):
        self.handler = handler
        self.registry = registry

    def __call__(self, request):
        # Logika untuk menangani Preflight (OPTIONS) request
        if request.method == 'OPTIONS':
            response = request.response
            # Header ini akan ditambahkan di bawah untuk semua response
            # Anda bisa menambahkan logika spesifik untuk OPTIONS di sini jika perlu
            # Misalnya, jika Anda ingin hanya mengizinkan metode tertentu untuk preflight
            # response.headers.update({
            #     'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
            #     'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
            #     'Access-Control-Max-Age': '86400' # Cache preflight selama 1 hari
            # })
            # return response # Langsung kembalikan response untuk OPTIONS

        # Proses request seperti biasa
        response = self.handler(request)

        # Tambahkan header CORS ke SEMUA response
        # Sesuaikan 'http://localhost:5173' dengan origin frontend Anda
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true') # Jika Anda menggunakan cookies/sesi dengan credentials
        response.headers.add('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE, PATCH')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-XSRF-TOKEN')
        response.headers.add('Access-Control-Expose-Headers', 'Content-Length, X-JSON') # Jika ada header kustom yang ingin diekspos
        response.headers.add('Access-Control-Max-Age', '86400') # Cache preflight response

        return response

def cors_tween_factory(handler, registry): # Ini adalah factory yang akan dipanggil Pyramid
    return CORSTweenFactory(handler, registry)
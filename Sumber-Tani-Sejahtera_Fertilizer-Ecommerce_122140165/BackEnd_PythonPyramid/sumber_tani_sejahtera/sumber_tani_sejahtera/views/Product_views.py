from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound, HTTPBadRequest, HTTPOk, HTTPCreated, HTTPNoContent
import transaction

from ..models import DBSession
from ..models.product import Product
# from ..security import isAdmin # Asumsi Anda akan membuat fungsi ini di security.py

# --- Helper untuk validasi dasar (bisa dikembangkan lebih lanjut) ---
def validate_product_data(data, is_update=False):
    required_fields = ['name', 'price', 'stock']
    if is_update: # Untuk update, tidak semua field wajib diisi
        pass
    else: # Untuk create, semua field wajib
        for field in required_fields:
            if field not in data or data[field] is None:
                raise HTTPBadRequest(json_body={'success': False, 'message': f"Field '{field}' diperlukan."})
    
    if 'price' in data and (not isinstance(data['price'], (int, float)) or data['price'] < 0):
        raise HTTPBadRequest(json_body={'success': False, 'message': 'Harga harus angka positif.'})
    if 'stock' in data and (not isinstance(data['stock'], int) or data['stock'] < 0):
        raise HTTPBadRequest(json_body={'success': False, 'message': 'Stok harus integer positif.'})


# --- API Endpoints untuk Produk ---

@view_config(route_name='api_products_collection', request_method='GET', renderer='json')
def list_products_view(request):
    """Menampilkan daftar semua produk."""
    try:
        products = DBSession.query(Product).all()
        return {'success': True, 'data': [product.to_dict() for product in products]}
    except Exception as e:
        request.log_exception(e)
        return HTTPBadRequest(json_body={'success': False, 'message': 'Gagal mengambil daftar produk.'})

@view_config(route_name='api_products_collection', request_method='POST', renderer='json')
def create_product_view(request):
    """Membuat produk baru. (Idealnya, ini harus dilindungi untuk admin)."""
    # PERIKSA OTORISASI ADMIN DI SINI
    # if not isAdmin(request): # Anda perlu implementasi isAdmin
    #     raise HTTPForbidden(json_body={'success': False, 'message': 'Akses ditolak. Hanya admin.'})
        
    try:
        data = request.json_body
        validate_product_data(data)

        new_product = Product(
            name=data.get('name'),
            description=data.get('description'),
            price=data.get('price'),
            stock=data.get('stock'),
            category_name=data.get('category_name'),
            image_url=data.get('image_url')
        )
        with transaction.manager:
            DBSession.add(new_product)
            DBSession.flush() # Untuk mendapatkan ID produk baru jika diperlukan
            request.response.status_code = 201 # HTTPCreated
            return {'success': True, 'message': 'Produk berhasil ditambahkan.', 'data': new_product.to_dict()}
            
    except HTTPBadRequest as e:
        request.response.status_code = e.status_code
        return e.json_body
    except Exception as e:
        request.log_exception(e)
        return HTTPBadRequest(json_body={'success': False, 'message': f'Gagal membuat produk: {str(e)}'})


@view_config(route_name='api_product_item', request_method='GET', renderer='json')
def get_product_view(request):
    """Menampilkan detail satu produk."""
    product_id = request.matchdict.get('product_id')
    try:
        product = DBSession.query(Product).filter_by(id=product_id).first()
        if not product:
            raise HTTPNotFound(json_body={'success': False, 'message': 'Produk tidak ditemukan.'})
        return {'success': True, 'data': product.to_dict()}
    except HTTPNotFound as e:
        request.response.status_code = e.status_code
        return e.json_body
    except Exception as e:
        request.log_exception(e)
        return HTTPBadRequest(json_body={'success': False, 'message': 'Gagal mengambil detail produk.'})

@view_config(route_name='api_product_item', request_method='PUT', renderer='json')
def update_product_view(request):
    """Memperbarui produk. (Idealnya, ini harus dilindungi untuk admin)."""
    # PERIKSA OTORISASI ADMIN DI SINI
    # if not isAdmin(request):
    #     raise HTTPForbidden(json_body={'success': False, 'message': 'Akses ditolak. Hanya admin.'})

    product_id = request.matchdict.get('product_id')
    try:
        product = DBSession.query(Product).filter_by(id=product_id).first()
        if not product:
            raise HTTPNotFound(json_body={'success': False, 'message': 'Produk tidak ditemukan.'})

        data = request.json_body
        validate_product_data(data, is_update=True)

        if 'name' in data:
            product.name = data['name']
        if 'description' in data:
            product.description = data['description']
        if 'price' in data:
            product.price = data['price']
        if 'stock' in data:
            product.stock = data['stock']
        if 'category_name' in data:
            product.category_name = data['category_name']
        if 'image_url' in data:
            product.image_url = data['image_url']
        
        with transaction.manager:
            DBSession.flush()
            return {'success': True, 'message': 'Produk berhasil diperbarui.', 'data': product.to_dict()}

    except HTTPNotFound as e:
        request.response.status_code = e.status_code
        return e.json_body
    except HTTPBadRequest as e:
        request.response.status_code = e.status_code
        return e.json_body
    except Exception as e:
        request.log_exception(e)
        return HTTPBadRequest(json_body={'success': False, 'message': f'Gagal memperbarui produk: {str(e)}'})

@view_config(route_name='api_product_item', request_method='DELETE', renderer='json')
def delete_product_view(request):
    """Menghapus produk. (Idealnya, ini harus dilindungi untuk admin)."""
    # PERIKSA OTORISASI ADMIN DI SINI
    # if not isAdmin(request):
    #     raise HTTPForbidden(json_body={'success': False, 'message': 'Akses ditolak. Hanya admin.'})

    product_id = request.matchdict.get('product_id')
    try:
        product = DBSession.query(Product).filter_by(id=product_id).first()
        if not product:
            raise HTTPNotFound(json_body={'success': False, 'message': 'Produk tidak ditemukan.'})
        
        with transaction.manager:
            DBSession.delete(product)
            DBSession.flush()
        
        # HTTP 204 No Content biasanya tidak memiliki body,
        # tapi jika frontend mengharapkan JSON, Anda bisa mengirimkannya.
        request.response.status_code = 200 # Atau 204 jika tidak ada body
        return {'success': True, 'message': 'Produk berhasil dihapus.'}

    except HTTPNotFound as e:
        request.response.status_code = e.status_code
        return e.json_body
    except Exception as e:
        request.log_exception(e)
        return HTTPBadRequest(json_body={'success': False, 'message': f'Gagal menghapus produk: {str(e)}'})

# View untuk OPTIONS request (jika diperlukan untuk CORS preflight)
@view_config(route_name='api_products_collection', request_method='OPTIONS', renderer='json')
@view_config(route_name='api_product_item', request_method='OPTIONS', renderer='json')
def product_preflight_view(request):
    # Header CORS akan ditangani oleh tween Anda
    return HTTPOk()
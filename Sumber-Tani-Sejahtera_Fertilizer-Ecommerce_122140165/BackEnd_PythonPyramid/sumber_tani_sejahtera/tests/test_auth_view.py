import unittest
from unittest import mock # Penting untuk mocking
from pyramid import testing
from pyramid.httpexceptions import HTTPBadRequest, HTTPConflict, HTTPUnauthorized, HTTPOk

# Asumsikan DBSession dan User model bisa di-import
from sumber_tani_sejahtera.models import DBSession  # Sesuaikan path jika perlu
from sumber_tani_sejahtera.models.user import User # Sesuaikan path jika perlu
# Asumsikan auth views bisa di-import
from sumber_tani_sejahtera.views.auth import register_view, login_view # Sesuaikan path jika perlu

class TestAuthViews(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()
        self.mock_dbsession_patch = mock.patch('sumber_tani_sejahtera.views.auth.DBSession')
        self.MockDBSession = self.mock_dbsession_patch.start()

        self.mock_transaction_patch = mock.patch('sumber_tani_sejahtera.views.auth.transaction')
        self.MockTransaction = self.mock_transaction_patch.start()

        self.mock_create_token_patch = mock.patch('sumber_tani_sejahtera.views.auth.create_access_token')
        self.MockCreateToken = self.mock_create_token_patch.start()

    def tearDown(self):
        testing.tearDown()
        self.mock_dbsession_patch.stop()
        self.mock_transaction_patch.stop()
        self.mock_create_token_patch.stop()

    # --- Test untuk register_view ---
    def test_register_success(self):
        request = testing.DummyRequest()
        request.json_body = {'username': 'newuser', 'email': 'new@example.com', 'password': 'password123'}

        self.MockDBSession.query(User).filter_by(username='newuser').first.return_value = None
        self.MockDBSession.query(User).filter_by(email='new@example.com').first.return_value = None

        mock_new_user_instance = mock.MagicMock(spec=User)
        with mock.patch('sumber_tani_sejahtera.views.auth.User', return_value=mock_new_user_instance) as MockUserClass:
            response = register_view(request)

        self.assertEqual(request.response.status_code, 201)
        self.assertEqual(response, {'success': True, 'message': 'Pendaftaran berhasil! Silakan login.'})
        self.MockDBSession.add.assert_called_once_with(mock_new_user_instance)
        self.MockDBSession.flush.assert_called_once()
        mock_new_user_instance.set_password.assert_called_once_with('password123')

    def test_register_username_exists(self):
        request = testing.DummyRequest()
        request.json_body = {'username': 'existinguser', 'email': 'new@example.com', 'password': 'password123'}
        mock_existing_user = mock.MagicMock(spec=User)
        self.MockDBSession.query(User).filter_by(username='existinguser').first.return_value = mock_existing_user
        response = register_view(request)
        self.assertEqual(request.response.status_code, 409)
        self.assertEqual(response, {'success': False, 'message': 'Username sudah digunakan.'})

    def test_register_email_exists(self):
        request = testing.DummyRequest()
        test_username_unik = 'userUnikUntukTesEmailXYZ' 
        test_email_terdaftar = 'email.sudah.ada.banget@example.com'

        request.json_body = {
            'username': test_username_unik,
            'email': test_email_terdaftar,
            'password': 'password123'
        }

        mock_hasil_query_username = mock.MagicMock()
        mock_hasil_query_username.first.return_value = None 

        mock_hasil_query_email = mock.MagicMock()
        mock_user_ditemukan_via_email = mock.MagicMock(spec=User)
        mock_hasil_query_email.first.return_value = mock_user_ditemukan_via_email

        # Definisikan side_effect untuk metode filter_by
        def side_effect_filter_by(**kwargs):
            if 'username' in kwargs and kwargs['username'] == test_username_unik:
                print(f"[DEBUG side_effect_filter_by] Dipanggil untuk username: {kwargs['username']}, mengembalikan mock yang .first nya None")
                return mock_hasil_query_username 
            elif 'email' in kwargs and kwargs['email'] == test_email_terdaftar:
                print(f"[DEBUG side_effect_filter_by] Dipanggil untuk email: {kwargs['email']}, mengembalikan mock yang .first nya User instance")
                return mock_hasil_query_email
            
            # Jika dipanggil dengan argumen lain, kembalikan mock default atau raise error
            print(f"[DEBUG side_effect_filter_by] Panggilan tak terduga atau tidak di-handle: {kwargs}")
            default_mock_filter_obj = mock.MagicMock()
            default_mock_filter_obj.first.return_value = mock.MagicMock(spec=User) 
            return default_mock_filter_obj

        mock_query_obj = mock.MagicMock()
        mock_query_obj.filter_by.side_effect = side_effect_filter_by
        self.MockDBSession.query.return_value = mock_query_obj
        
        print("\n--- DEBUG INFO test_register_email_exists (setelah perombakan mock) ---")
        print(f"Request body: {request.json_body}")
        
        response = register_view(request) 
        
        print(f"Respons dari view: {response}")
     
        self.assertTrue(mock_query_obj.filter_by.called, "MockDBSession.query().filter_by() tidak dipanggil")
        
        
        print("--- AKHIR DEBUG INFO ---\n")

        # Assertions
        self.assertEqual(request.response.status_code, 409) 
        self.assertEqual(response, {'success': False, 'message': 'Email sudah terdaftar.'})

    def test_register_missing_fields(self):
        request = testing.DummyRequest()
        request.json_body = {'username': 'newuser'}
        response = register_view(request)
        self.assertEqual(request.response.status_code, 400)
        self.assertEqual(response, {'success': False, 'message': 'Username, email, dan password diperlukan.'})

    # --- Test untuk login_view ---
    def test_login_success(self):
        request = testing.DummyRequest()
        request.json_body = {'username': 'testuser', 'password': 'password123'}
        mock_user = mock.MagicMock(spec=User)
        mock_user.id = 1
        mock_user.username = 'testuser'
        mock_user.email = 'test@example.com'
        mock_user.verify_password.return_value = True
        self.MockDBSession.query(User).filter_by(username='testuser').first.return_value = mock_user
        self.MockCreateToken.return_value = "sample.jwt.token"
        response = login_view(request)
        self.assertEqual(response['success'], True)
        self.assertEqual(response['message'], 'Login berhasil!')
        self.assertEqual(response['token'], "sample.jwt.token")
        self.assertIn('user', response)
        self.assertEqual(response['user']['username'], 'testuser')
        mock_user.verify_password.assert_called_once_with('password123')
        self.MockCreateToken.assert_called_once_with(data={"sub": 'testuser', "user_id": 1})

    def test_login_invalid_credentials_user_not_found(self):
        request = testing.DummyRequest()
        request.json_body = {'username': 'unknownuser', 'password': 'password123'}
        self.MockDBSession.query(User).filter_by(username='unknownuser').first.return_value = None
        response = login_view(request)
        self.assertEqual(request.response.status_code, 401)
        self.assertEqual(response, {'success': False, 'message': 'Username atau password salah.'})

    def test_login_invalid_credentials_wrong_password(self):
        request = testing.DummyRequest()
        request.json_body = {'username': 'testuser', 'password': 'wrongpassword'}
        mock_user = mock.MagicMock(spec=User)
        mock_user.username = 'testuser'
        mock_user.verify_password.return_value = False
        self.MockDBSession.query(User).filter_by(username='testuser').first.return_value = mock_user
        response = login_view(request)
        self.assertEqual(request.response.status_code, 401)
        self.assertEqual(response, {'success': False, 'message': 'Username atau password salah.'})

    def test_login_missing_fields(self):
        request = testing.DummyRequest()
        request.json_body = {'username': 'testuser'}
        response = login_view(request)
        self.assertEqual(request.response.status_code, 400)
        self.assertEqual(response, {'success': False, 'message': 'Username dan password diperlukan.'})

if __name__ == '__main__':
    unittest.main()
import unittest
from sumber_tani_sejahtera.models.user import User 

class TestUserModel(unittest.TestCase):

    def test_set_password_hashes_password(self):
        user = User()
        user.set_password("password123")
        self.assertIsNotNone(user.hashed_password)
        self.assertNotEqual(user.hashed_password, "password123")

    def test_verify_password_correct(self):
        user = User()
        user.set_password("password123")
        self.assertTrue(user.verify_password("password123"))

    def test_verify_password_incorrect(self):
        user = User()
        user.set_password("password123")
        self.assertFalse(user.verify_password("wrongpassword"))

    def test_user_representation(self):
        user = User(username="testuser", email="test@example.com")
        self.assertEqual(repr(user), "<User(username='testuser', email='test@example.com')>")

if __name__ == '__main__':
    unittest.main()
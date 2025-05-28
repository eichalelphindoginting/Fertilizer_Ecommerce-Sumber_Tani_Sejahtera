# File: sumber_tani_sejahtera/sumber_tani_sejahtera/tests.py
import unittest
import transaction
from unittest import mock # Pastikan mock diimpor jika digunakan di test_auth_view.py atau file lain

from pyramid import testing
from sqlalchemy import engine_from_config

from .models import DBSession
from .models.meta import Base

# Impor MyModel langsung dari file spesifiknya

from .models.mymodel import MyModel

def dummy_request(dbsession):
    return testing.DummyRequest(dbsession=dbsession)

class BaseTest(unittest.TestCase):
    def setUp(self):
        self.config = testing.setUp(settings={
'sqlalchemy.url': 'sqlite:///:memory:'
})
        self.config.include('.models')
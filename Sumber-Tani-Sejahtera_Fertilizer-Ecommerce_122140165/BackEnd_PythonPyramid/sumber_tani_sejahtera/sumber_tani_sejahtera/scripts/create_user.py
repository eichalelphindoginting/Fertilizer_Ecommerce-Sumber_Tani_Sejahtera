from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker
from pyramid.paster import get_appsettings, setup_logging
from sumber_tani.sejahtera.models import meta
from sumber_tani_sejahtera.models.Login import User
import sys

def main(argv=sys.argv):
    if len(argv) != 2:
        print("Usage: python create_user.py development.ini")
        sys.exit(1)

    config_uri = argv[1]
    setup_logging(config_uri)
    settings = get_appsettings(config_uri)
    engine = engine_from_config(settings, 'sqlalchemy.')
    meta.Base.metadata.create_all(engine)
    DBSession = sessionmaker(bind=engine)

    session = DBSession()
    user = User(username='admin', password='123')
    session.add(user)
    session.commit()
    print("User admin created.")

if __name__ == '__main__':
    main()

from peewee import *
from dotenv import load_dotenv
import os
from datetime import datetime

load_dotenv()

psql_db = PostgresqlDatabase(database=str(os.environ['POSTGRES_DB']),
                             user=str(os.environ['POSTGRES_USER']),
                             password=str(os.environ['POSTGRES_PASSWORD']),
                             host=str(os.environ['HOST']))

class Base(Model):
    class Meta:
        database = psql_db

class SensorsData(Base):
    equipmentId=TextField()
    timestamp=DateTimeField()
    value=FloatField()
    created_at=DateTimeField(default=datetime.now)

psql_db.connect()
psql_db.create_tables([SensorsData])
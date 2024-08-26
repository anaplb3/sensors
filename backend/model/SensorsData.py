from peewee import *
from dotenv import load_dotenv
import os

load_dotenv()

psql_db = PostgresqlDatabase(database=str(os.environ['DATABASE_NAME']),
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

psql_db.connect()
psql_db.create_tables([SensorsData])
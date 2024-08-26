from model.SensorsData import SensorsData
from datetime import datetime, timedelta, timezone
import pandas as pd
from peewee import *

model = SensorsData()
class SensorsDataService:
    
    def create_data_from_payload(self, payload):
        equipmentId = payload['equipmentId']
        timestamp = datetime.fromisoformat(payload['timestamp'])
        payload_value = payload['value']

        SensorsData.create(equipmentId=equipmentId,
                           timestamp=timestamp,
                           value=payload_value)
        
    def create_data_from_csv(self, file):
        data = pd.read_csv(file)
        records  = data.to_dict(orient='records')

        for row in records:
            equipmentId = row['equipmentId']
            timestamp = datetime.fromisoformat(str(row['timestamp']))
            payload_value = row['value']

            SensorsData.create(equipmentId=equipmentId,
                            timestamp=timestamp,
                            value=payload_value)

    def get_average_value(self, time_limit):
        time = self.get_time(time_limit)
        print(time)
        where = (SensorsData.timestamp >= time) & (SensorsData.timestamp <= datetime.now(timezone.utc))
        query_result = SensorsData.select(SensorsData.equipmentId, fn.AVG(SensorsData.value).alias('avg_value')).where(where).group_by(SensorsData.equipmentId)
        result = []
        for data in query_result:
            result.append({'equipmentId': data.equipmentId, 'avgValue': round(data.avg_value, 2)})
        return result
    
    def get_average_values_per_equipment(self):
        time = datetime.now(timezone.utc) - timedelta(weeks=4)
        where = (SensorsData.timestamp >= time) & (SensorsData.timestamp <= datetime.now(timezone.utc))

        query_result = SensorsData.select(SensorsData.equipmentId, fn.ARRAY_AGG(SensorsData.value, coerce=False).alias('values')).where(where).group_by(SensorsData.equipmentId)

        result = []
        for data in query_result:
            result.append({'equipmentId': data.equipmentId, 'values': data.values})
        return result
    
    def get_time(self, time_limit):
        now = datetime.now()
        match time_limit:
            case "24h":
                return now - timedelta(hours=24)
            case "48h":
                return now - timedelta(hours=48)
            case "1w":
                return now - timedelta(weeks=1)
            case "1m":
                return now - timedelta(weeks=4)
            case _:
                return now - timedelta(weeks=4)
        
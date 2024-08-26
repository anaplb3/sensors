from flask_restx import Api

from .controller import api as sensor_api

api = Api(
    title='Sensores API',
    version='1.0',
    description='API que recebe dados dos sensores'
)

api.add_namespace(sensor_api)
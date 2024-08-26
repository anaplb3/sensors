from flask_restx import Namespace, Resource, fields
from werkzeug.datastructures import FileStorage
from service.SensorsDataService import SensorsDataService

api = Namespace('sensores', description='Recebe dados dos sensores')
data = api.model('Data', {
    'equipmentId': fields.String(required=True, description='Id do equipamento'),
    'timestamp': fields.DateTime(required=True, description='Timestamp'),
    'value': fields.Float(required=True, description='Valor do sensor')
})

upload_parser = api.parser()
upload_parser.add_argument('file', location='files', type=FileStorage, required=True)

parser = api.parser()
parser.add_argument('timeLimit', type=str, required=True)
service = SensorsDataService()

@api.route('/')
@api.expect(data)
class SensorsData(Resource):
    def post(self):
        content = api.payload
        service.create_data_from_payload(content)

@api.route("/averageValues")
@api.expect(parser)
class Sensors(Resource):
    def get(self):
        args = parser.parse_args()
        return service.get_average_value(args['timeLimit'])

@api.route('/csv')
@api.expect(upload_parser)
class SensorsDataCSV(Resource):
    def post(self):
        args = upload_parser.parse_args()
        uploaded_file = args['file']
        service.create_data_from_csv(uploaded_file)
        
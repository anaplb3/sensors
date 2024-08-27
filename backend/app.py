from flask import Flask
from controller import api
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
api.init_app(app)


app.run(debug=os.environ['DEBUG'], host="0.0.0.0")
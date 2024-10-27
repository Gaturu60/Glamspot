# Standard library imports

# Remote library imports
import cloudinary.uploader
from flask import Flask
from flask_cors import CORS  # type: ignore # Cross-Origin Resource Sharing
from flask_migrate import Migrate  # For handling database migrations
from flask_restful import Api  # For building RESTful APIs
from flask_sqlalchemy import SQLAlchemy  # For ORM
from sqlalchemy import MetaData  # For metadata configuration
from flask_bcrypt import Bcrypt  # For password hashing
import cloudinary
import cloudinary.uploader
import cloudinary.api

from dotenv import load_dotenv
import os
load_dotenv()





# Local imports
# (Add your local imports here, e.g., models)

# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://glamspotdb_user:TswhNljt9sVb8EMFlequn1guJbXJ8mgB@dpg-csfa2edsvqrc73fd5r4g-a.oregon-postgres.render.com/glamspotdb'  # Database URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable modification tracking
app.json.compact = False  # Disable JSON compacting for easier readability

# Define metadata for naming conventions
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

# Instantiate the database
db = SQLAlchemy(metadata=metadata)  # Pass the metadata to SQLAlchemy
migrate = Migrate(app, db)  # Initialize Flask-Migrate with app and db
bcrypt = Bcrypt(app)

# Initialize the database with the app
db.init_app(app)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "https://glamspot.onrender.com"}})  # Enable CORS for all routes

# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv("dfylsdyun"),
    api_key=os.getenv("428635378714162"),
    api_secret=os.getenv("72-KJ5jsvWHBUxbjYwAK03yjWjY"),
)

# Add your routes and API resource endpoints here
@app.route('/')
def index():
    return '<h1>Welcome to the Glamspot API</h1>'

# if __name__ == '__main__':
#     app.run(port=5555, debug=True)  # Run the app
# Standard library imports

# Remote library imports
from flask import Flask
from flask_cors import CORS  # type: ignore # Cross-Origin Resource Sharing
from flask_migrate import Migrate  # For handling database migrations
from flask_restful import Api  # For building RESTful APIs
from flask_sqlalchemy import SQLAlchemy  # For ORM
from sqlalchemy import MetaData  # For metadata configuration

from flask_bcrypt import Bcrypt

# Local imports
# (Add your local imports here, e.g., models)

# Instantiate app, set attributes
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"  # Database URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False  # Disable modification tracking
app.json.compact = False  # Disable JSON compacting for easier readability

# Define metadata for naming conventions
metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

# Instantiate the database
db = SQLAlchemy(metadata=metadata)  # Pass the metadata to SQLAlchemy
migrate = Migrate(app, db)  # Initialize Flask-Migrate with app and db
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)

# Initialize the database with the app
db.init_app(app)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:5173"}})  # Enable CORS for all routes


# if __name__ == '__main__':
#     app.run(port=5555, debug=True)  # Run the app

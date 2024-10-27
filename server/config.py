# # Standard library imports

# # Remote library imports
# from flask import Flask
# from flask_cors import CORS  # type: ignore # Cross-Origin Resource Sharing
# from flask_migrate import Migrate  # For handling database migrations
# from flask_restful import Api  # For building RESTful APIs
# from flask_sqlalchemy import SQLAlchemy  # For ORM
# from sqlalchemy import MetaData  # For metadata configuration
# from flask_bcrypt import Bcrypt  # For password hashing

# # Local imports
# # (Add your local imports here, e.g., models)

# # Instantiate app, set attributes
# app = Flask(__name__)
# app.config["JSONIFY_PRETTYPRINT_REGULAR"] = True  # For pretty JSON responses
# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"  # Database URI
# app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = (
#     False  # Disable modification trackingapp.json.compact = False  # Disable JSON compacting for easier readability
# )

# # Define metadata for naming conventions
# metadata = MetaData(
#     naming_convention={
#         "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
#     }
# )

# # Instantiate the database
# db = SQLAlchemy(metadata=metadata)  # Pass the metadata to SQLAlchemy
# migrate = Migrate(app, db)  # Initialize Flask-Migrate with app and db
# bcrypt = Bcrypt(app)

# # Initialize the database with the app
# db.init_app(app)

# # Instantiate REST API
# api = Api(app)

# # Instantiate CORS
# CORS(
#     app,
#     supports_credentials=True,
#     resources={r"/*": {"origins": "http://localhost:5173"}},
# )  # Enable CORS for all routes


# # Add your routes and API resource endpoints here
# @app.route("/")
# def index():
#     return "<h1>Welcome to the Glamspot API</h1>"


# # if __name__ == '__main__':
# #     app.run(port=5555, debug=True)  # Run the app


# Standard library imports

# Remote library imports
from flask import Flask, request, jsonify  # Import request and jsonify
from flask_cors import CORS  # type: ignore # Cross-Origin Resource Sharing
from flask_migrate import Migrate  # For handling database migrations
from flask_restful import Api  # For building RESTful APIs
from flask_sqlalchemy import SQLAlchemy  # For ORM
from sqlalchemy import MetaData  # For metadata configuration
from flask_bcrypt import Bcrypt  # For password hashing
import cloudinary
import cloudinary.uploader  # For uploading files
import cloudinary.api  # For accessing Cloudinary API features

# Local imports
# (Add your local imports here, e.g., models)

# Instantiate app, set attributes
app = Flask(__name__)
app.config["JSONIFY_PRETTYPRINT_REGULAR"] = True  # For pretty JSON responses
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"  # Database URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False  # Disable modification tracking
app.config["CLOUDINARY_URL"] = (
    "cloudinary://<api_key>:<api_secret>@<cloud_name>"  # Set your Cloudinary credentials here
)

# Initialize Cloudinary
cloudinary.config(
    cloud_name="djelfe9f1",  # Replace with your cloud name
    api_key="422118878456358",  # Replace with your API key
    api_secret="nMq_55cykYrsOqmoLF9eQ559NjE",  # Replace with your API secret
)

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

# Initialize the database with the app
db.init_app(app)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(
    app,
    supports_credentials=True,
    resources={r"/*": {"origins": "http://localhost:5173"}},
)  # Enable CORS for all routes


# Route for uploading images to Cloudinary
@app.route("/upload", methods=["POST"])
def upload_image():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    try:
        # Upload the image to Cloudinary
        response = cloudinary.uploader.upload(file)
        return (
            jsonify(
                {
                    "url": response["url"],  # Return the URL of the uploaded image
                    "public_id": response[
                        "public_id"
                    ],  # Return the public ID of the uploaded image
                }
            ),
            200,
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/")
def index():
    return "<h1>Welcome to the Glamspot API</h1>"


# if __name__ == '__main__':
#     app.run(port=5555, debug=True)  # Run the app

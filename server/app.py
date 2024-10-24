#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource  # type: ignore
from datetime import datetime
import os

# Local imports
from config import app, db, api
from models import (
    User,
    Stylist,
    Service,
    Booking,
)  # Ensure Booking replaces Appointment
app.config['SESSION_COOKIE_SAMESITE']= 'None'
app.config['SESSION_COOKIE_SECURE']=True

# # app = Flask(__name__)

# # Enable CORS for all routes, including preflight (OPTIONS) requests
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:5173"}})

# Set the secret key to a random string
app.secret_key = os.urandom(28)

# Before request
@app.before_request
def log_session_activity():
    user_id = session.get('user_id')
    if user_id:
        print(f"Session active. User ID: {user_id}")
    else:
        print("No active session.")


# User Resource
class UserResource(Resource):
    def get(self):
        users = User.query.all()
        user_list = [
            {"id": user.id, "name": user.name, "email": user.email} for user in users
        ]
        return {"users": user_list}, 200

    def post(self):
        try:
            data = request.get_json()
            
            new_user = User(name=data['name'], email=data['email'], role='user')
            new_user.set_password(data['password']) #Hash the password

            db.session.add(new_user)
            db.session.commit()
            return new_user.to_dict(), 201
        except Exception as e:
            return {'error': str(e)}, 500


    def patch(self, id):
        user = User.query.get(id)
        if not user:
            return {"error": "User not found"}, 404

        data = request.get_json()

        if "name" in data:
            user.name = data["name"]
        if "email" in data:
            user.email = data["email"]

        db.session.commit()
        return {"message": "User updated successfully!", "user": user.to_dict()}, 200


    def delete(self, id):
        user = User.query.get(id)
        if not user:
            return {"error": "User not found"}, 404

        db.session.delete(user)
        db.session.commit()
        return {"message": "User deleted successfully!"}, 200

# Stylist Resource
class StylistResource(Resource):
    def get(self):
        stylists = Stylist.query.all()
        stylist_list = [
            {"id": stylist.id, "name": stylist.name, "specialty": stylist.specialty}
            for stylist in stylists
        ]
        return {"stylists": stylist_list}, 200

    def post(self):
        data = request.get_json()
        new_stylist = Stylist(name=data["name"], specialty=data["specialty"])
        db.session.add(new_stylist)
        db.session.commit()
        return {"message": "Stylist created successfully!"}, 201

# Service Resource
class ServiceResource(Resource):
    def get(self):
        services = Service.query.all()
        service_list = [
            {"id": service.id, "name": service.name, "price": service.price}
            for service in services
        ]
        return {"services": service_list}, 200

    def post(self):
        data = request.get_json()
        new_service = Service(name=data["name"], price=data["price"])
        db.session.add(new_service)
        db.session.commit()
        return {"message": "Service created successfully!"}, 201

# Booking Resource
class BookingResource(Resource):
    def get(self):
        try:            
            bookings = Booking.query.all()            
            bookings_dict = [booking.to_dict() for booking in bookings]            
            return bookings_dict, 200 
        except Exception as e:            
            return {'error': str(e)}, 500

    def post(self):
        user_id = session.get("user_id")  # Retrieve user_id from session
        if not user_id:
            return {"error": "User not logged in"}, 401

        data = request.get_json()

        try:
            # Extract other fields from the request data
            stylist_id = data['stylist_id']
            service_id = data['service_id']
            date_time_obj = datetime.strptime(data['date_time'], '%Y-%m-%dT%H:%M:%S')

            # Create the booking with the session user_id
            new_booking = Booking(
                user_id=user_id,  # Use user_id from session
                stylist_id=stylist_id,
                service_id=service_id,
                date_time=date_time_obj,
            )

            db.session.add(new_booking)
            db.session.commit()

            return new_booking.to_dict(), 201

        except KeyError as e:
            return {"error": f"Missing key: {str(e)}"}, 400

        except Exception as e:
            return {"error": str(e)}, 500
        
        
        
# Authentication and Authorization Resources
class SignupResource(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        # Check if the email already exists
        if User.query.filter_by(email=email).first():
            return {"error": "Email already exists"}, 400

        # Create new user and hash the password
        new_user = User(username=username, email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()

        return {"message": "User registered successfully!"}, 201

# Login Resource
class LoginResource(Resource):
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        # Find user by email
        user = User.query.filter_by(email=email).first()

        if user is None:
            print(f"Login failed: No user found with email {email}")
            return {"error": "Invalid email or password"}, 401
        
        #Check if user exists and if password is correct
        if user and user.check_password(password):
            session['user_id'] = user.id
            return {"message": "Login successful", "role": user.role}, 200
        else:
            return {"error": "Invalid email or password"}, 401

    
# Protected Resource
class ProtectedResource(Resource):
    def get(self):
        user_id = session.get("user_id")
        if not user_id:
            print("No active session")
            return {"error": "Unauthorized"}, 401

        user = User.query.get(user_id)
        if user:
            print(f"User {user_id} is accessing protected route.")
            return {"message": f"Welcome {user.name}"}, 200
        else:
            print(f"Session contains invalid user_id: {user_id}")
            return {"error": "Invalid session"}, 401


# Logout Resource
class LogoutResource(Resource):
    def post(self):
        session.pop("user_id", None)
        return {"message": "Logged out successfully!"}, 200
    
class AdminUserResource(Resource):
    def get(self):
        users = User.query.all()
        user_list = [{"id": user.id, "name": user.name, "email": user.email, "role": user.role} for user in users]
        return user_list, 200  # Return list of users
    
    def patch(self, id):
        user = User.query.get(id)
        if not user:
            return {"error": "User not found"}, 404

        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        role = data.get('role')

        # Update only if provided in the request
        if name:
            user.name = name
        if email:
            user.email = email

        # Restrict role updates to admin users only
        if role and role == "admin":
            if session.get('user_role') == 'admin':  # Ensure only admins can assign admin role
                user.role = role
            else:
                return {"error": "Only admins can assign the admin role"}, 403

        db.session.commit()
        return {"message": "User updated successfully", "user": user.to_dict()}, 200
    
    def delete(self, id):
        user = User.query.get(id)
        if not user:
            return {"error": "User not found"}, 404
        db.session.delete(user)
        db.session.commit()
        return {"message": "User deleted successfully"}, 200


# Authentication and Authorization Resources


class SignupResource(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        # Check if the email already exists
        if User.query.filter_by(email=email).first():
            return {"error": "Email already exists"}, 400

        # Create new user and hash the password
        new_user = User(username=username, email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()

        return {"message": "User registered successfully!"}, 201


class LoginResource(Resource):
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        user = User.query.filter_by(email=email).first()
        if not user or not user.check_password(password):
            return {"error": "Invalid email or password"}, 401

        # Store the user id in session
        session["user_id"] = user.id
        return {"message": "Login successful"}, 200


class ProtectedResource(Resource):
    def get(self):
        user_id = session.get("user_id")
        if not user_id:
            return {"error": "Unauthorized"}, 401

        user = User.query.get(user_id)
        return {"message": f"Welcome, {user.username}"}, 200


# Logout Resource
class LogoutResource(Resource):
    def post(self):
        session.pop("user_id", None)
        return {"message": "Logged out successfully!"}, 200


# Define RESTful resources and routes
api.add_resource(UserResource, "/users", "/users/<int:id>")
api.add_resource(StylistResource, "/stylists", "/stylists/<int:id>")  # type: ignore
api.add_resource(ServiceResource, "/services", "/services/<int:id>")  # type: ignore
api.add_resource(BookingResource, "/bookings", "/bookings/<int:id>")
api.add_resource(SignupResource, "/signup")
api.add_resource(LoginResource, "/login")
api.add_resource(ProtectedResource, "/protected")
api.add_resource(LogoutResource, "/logout")

# Index route (renamed)
@app.route("/")
def home():
    return "<h1>Project Server</h1>"


# Entry point for the app
if __name__ == '__main__':
    app.run(port=5000, debug=True)

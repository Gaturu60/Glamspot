#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource  # type: ignore

# Local imports
from config import app, db, api
from models import (
    User,
    Stylist,
    Service,
    Booking,
)  # Ensure Booking replaces Appointment

# Flask-RESTful Resources


class UserResource(Resource):
    def get(self):
        users = User.query.all()
        user_list = [
            {"id": user.id, "name": user.name, "email": user.email} for user in users
        ]
        return {"users": user_list}, 200

    def post(self):
        data = request.get_json()
        new_user = User(name=data["name"], email=data["email"])
        db.session.add(new_user)
        db.session.commit()
        return {"message": "User created successfully!"}, 201


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


class BookingResource(Resource):
    def get(self):
        bookings = Booking.query.all()
        booking_list = [
            {
                "id": booking.id,
                "user_id": booking.user_id,
                "stylist_id": booking.stylist_id,
                "service_id": booking.service_id,
                "date_time": booking.date_time,
            }
            for booking in bookings
        ]
        return {"bookings": booking_list}, 200

    def post(self):
        data = request.get_json()
        new_booking = Booking(
            user_id=data["user_id"],
            stylist_id=data["stylist_id"],
            service_id=data["service_id"],
            date_time=data["date_time"],
        )
        db.session.add(new_booking)
        db.session.commit()
        return {"message": "Booking created successfully!"}, 201


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
if __name__ == "__main__":
    app.run(port=5555, debug=True)

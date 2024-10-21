#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource  # type: ignore
from datetime import datetime
from flask_login import login_user

# Local imports
from config import app, db, api
from models import (
    User,
    Stylist,
    Service,
    Booking,
)  # Ensure Booking replaces Appointment

# Flask-RESTful Resources
class LoginResource(Resource):
    def post(self):
        data=request.get_json()
        email=data.get('email')
        password=data.get('password')

        user = User.query.filter_by(email=email).first()
        if user is None or not user.check_password(password):
            return {'error': 'Invalid credentials'}, 401
        
        login_user(user)

        return {'message': 'Login successful', "user": user.to_dict()}, 200


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
            new_user = User(name=data['name'], email=data['email'])
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
        try:            
            bookings = Booking.query.all()            
            bookings_dict = [booking.to_dict() for booking in bookings]            
            return bookings_dict, 200 
        except Exception as e:            
            return {'error': str(e)}, 500

    def post(self):
        try:
            data = request.get_json()
            print("Incoming data:", data)

            # Convert date_time from string to a Python datetime object
            date_time_obj = datetime.strptime(data['date_time'], '%Y-%m-%dT%H:%M:%S')

            # Create new booking with the converted date_time
            new_booking = Booking(
                user_id=data['user_id'],
                stylist_id=data['stylist_id'],
                service_id=data['service_id'],
                date_time=date_time_obj  # Use the converted datetime object
            )
            db.session.add(new_booking)
            db.session.commit()

            return new_booking.to_dict(), 201
        
        except Exception as e:
            print(f"Error: {str(e)}")  # Print the error message for debugging
            return {"error": str(e)}, 500


# Define RESTful resources and routes
api.add_resource(UserResource, '/users', '/users/<int:id>')
api.add_resource(StylistResource, '/stylists', '/stylists/<int:id>')
api.add_resource(ServiceResource, '/services', '/services/<int:id>')  
api.add_resource(BookingResource, '/bookings', '/bookings/<int:id>')

# Index route (renamed)
@app.route("/")
def home():
    return "<h1>Project Server</h1>"


# Entry point for the app
if __name__ == '__main__':
    app.run(port=5000, debug=True)

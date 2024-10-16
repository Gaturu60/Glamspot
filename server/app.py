#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource  # type: ignore

# Local imports
from config import app, db, api
from models import User, Stylist, Service, Appointment  

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

# Example View for creating a new user
@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = User(name=data['name'], email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    return {"message": "User created successfully!"}, 201

# Example View for reading users
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    user_list = [{"id": user.id, "name": user.name, "email": user.email} for user in users]
    return {"users": user_list}, 200

if __name__ == '__main__':
    app.run(port=5555, debug=True)

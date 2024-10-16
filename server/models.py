from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
stylist_service = db.Table('stylist_service',
    db.Column('stylist_id', db.Integer, db.ForeignKey('stylists.id'), primary_key=True),
    db.Column('service_id', db.Integer, db.ForeignKey('services.id'), primary_key=True),
    db.Column('price', db.Float, nullable=False)  # Add a price attribute
)

# User Model
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    # One-to-Many Relationship: A user can have many appointments
    appointments = db.relationship('Appointment', backref='user', lazy=True)

# Stylist Model
class Stylist(db.Model, SerializerMixin):
    __tablename__ = 'stylists'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    specialty = db.Column(db.String(120))

    
    appointments = db.relationship('Appointment', backref='stylist', lazy=True)

    
    services = db.relationship('Service', secondary=stylist_service, back_populates='stylists')


class Service(db.Model, SerializerMixin):
    __tablename__ = 'services'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(200))

    appointments = db.relationship('Appointment', backref='service', lazy=True)

    
    stylists = db.relationship('Stylist', secondary=stylist_service, back_populates='services')


class Appointment(db.Model, SerializerMixin):
    __tablename__ = 'appointments'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    stylist_id = db.Column(db.Integer, db.ForeignKey('stylists.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False)
    date_time = db.Column(db.DateTime, nullable=False)

    
    user = db.relationship('User', backref='appointments')
    stylist = db.relationship('Stylist', backref='appointments')
    service = db.relationship('Service', backref='appointments')
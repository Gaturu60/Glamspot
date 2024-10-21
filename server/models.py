from sqlalchemy_serializer import SerializerMixin  # type: ignore
from werkzeug.security import generate_password_hash, check_password_hash
# from flask_login import UserMixin
from config import db, bcrypt

# Association table for many-to-many relationship between Stylists and Services
stylist_service = db.Table(
    'stylist_service',
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
    password_hash = db.Column(db.String(200), nullable=False) #store hashed password
    role = db.Column(db.String(20), nullable=False, default= 'user')

    # # Add the required methods for Flask-Login
    # def is_active(self):
    #     return True  # Can add logic for deactivated accounts

    # def is_authenticated(self):
    #     return True  # User is authenticated if they are logged in

    # def is_anonymous(self):
    #     return False  # Anonymous users are not logged in

    # def get_id(self):
    #     return str(self.id)  # Return the unique user ID as a string

    # Password handling methods
    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)
    
    def is_admin(self):
        return self.role == 'admin'

    # One-to-Many Relationship: A user can have many bookings
    bookings = db.relationship('Booking', back_populates='user')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'bookings': [booking.to_dict() for booking in self.bookings]
        }

# Stylist Model
class Stylist(db.Model, SerializerMixin):
    __tablename__ = 'stylists'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    specialty = db.Column(db.String(120))

    # One-to-Many Relationship: A stylist can have multiple bookings
    bookings = db.relationship('Booking', back_populates='stylist')

    # Many-to-Many Relationship with Services
    services = db.relationship('Service', secondary=stylist_service, back_populates='stylists')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'specialty': self.specialty,
            'bookings': [booking.to_dict() for booking in self.bookings],
            'services': [service.to_dict() for service in self.services]
        }

# Service Model
class Service(db.Model, SerializerMixin):
    __tablename__ = 'services'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(200))
    price = db.Column(db.Float, nullable=False)

    # One-to-Many Relationship: A service can be part of multiple bookings
    bookings = db.relationship('Booking', back_populates='service')

    # Many-to-Many Relationship with Stylists
    stylists = db.relationship('Stylist', secondary=stylist_service, back_populates='services')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'bookings': [booking.to_dict() for booking in self.bookings]
        }

# Booking Model 
class Booking(db.Model, SerializerMixin):
    __tablename__ = 'bookings'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    stylist_id = db.Column(db.Integer, db.ForeignKey('stylists.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False)
    date_time = db.Column(db.DateTime, nullable=False)

    # Relationships: Define with back_populates
    user = db.relationship('User', back_populates='bookings')
    stylist = db.relationship('Stylist', back_populates='bookings')
    service = db.relationship('Service', back_populates='bookings')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'stylist_id': self.stylist_id,
            'service_id': self.service_id,
            'date_time': self.date_time.isoformat()  
        }

#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker  # type: ignore

# Local imports
from app import app
from models import db, User, Stylist, Service, Booking  # Changed Appointment to Booking

if __name__ == '__main__':
    fake = Faker()

    with app.app_context():
        print("Starting seed...")

        # Drop all tables and recreate them
        db.drop_all()
        db.create_all()

        # Seed users
        users = []
        for _ in range(10):
            user = User(name=fake.name(), email=fake.unique.email())  # Fixed missing commas
            users.append(user)
        db.session.bulk_save_objects(users)

        # Seed stylists
        stylists = []
        for _ in range(5):
            stylist = Stylist(name=fake.name(), specialty=rc(['Hair', 'Nails', 'Makeup', 'Massage']))
            stylists.append(stylist)
        db.session.bulk_save_objects(stylists)

        # Seed services
        services = []
        service_names = ['Haircut', 'Manicure', 'Pedicure', 'Facial', 'Massage']
        for name in service_names:
            service = Service(name=name, description=fake.text(max_nb_chars=50), price=rc([30.0,50.0,70.0]))  # Added missing commas
            services.append(service)
        db.session.bulk_save_objects(services)

        # Seed bookings (previously appointments)
        bookings = []
        for _ in range(20):
            booking = Booking(  # Changed to Booking
                user_id=randint(1, 10),
                stylist_id=randint(1, 5),
                service_id=randint(1, len(services)),
                date_time=fake.date_time_this_year()
            )
            bookings.append(booking)
        db.session.bulk_save_objects(bookings)

        # Commit all changes
        db.session.commit()

        print("Seeding completed.")

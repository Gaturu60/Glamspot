#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker  # type: ignore

# Local imports
from app import app
from models import db, User, Stylist, Service, Booking  # Changed Appointment to Booking

if __name__ == "__main__":
    fake = Faker()

    with app.app_context():
        print("Starting seed...")

        # Drop all tables and recreate them
        db.drop_all()
        db.create_all()

         # Seed regular users
        users = []
        for _ in range(10):
            user = User(name=fake.name(), email=fake.unique.email())
            users.append(user)

        # Seed admin users
        admins = []
        for i in range(3):  # Create 3 admin users
            admin = User(
                name=f"Admin{i+1}",
                email=f"admin{i+1}@example.com",
                role="admin"  # Admin user
            )
            admin.set_password("adminpassword")  # Default admin password
            admins.append(admin)

        db.session.bulk_save_objects(users + admins)


        # Seed stylists
        stylists = []
        for _ in range(5):
            stylist = Stylist(
                name=fake.name(), specialty=rc(["Hair", "Nails", "Makeup", "Massage"])
            )
            stylists.append(stylist)
        db.session.bulk_save_objects(stylists)

        # Seed services
        services = []
        service_names = ["Haircut", "Manicure", "Pedicure", "Facial", "Massage"]
        for name in service_names:
            service = Service(name=name, description=fake.text(max_nb_chars=50))
            services.append(service)
        db.session.bulk_save_objects(services)
        
    services_data = [
        {
            "name": "haircut",
            "image_path":http://127.0.0.1:5000/server/static /images/DALL·E 2024-10-22 01.20.42 -
        }, 
        {
            "name": "manicure",
            "image_path":
        },
        {
            "name": "pedicure",
            "image_path": http://127.0.0.1:5000/static/images/server/static
        },
        {
            "name": "facial",
            "image_path":https://127.0.0.1:5000/static/images/media.istockphoto.com/id/486873186/photo/what-a-pleasure.jpg?s=2048x2048&w=is&k=20&c=-W48zV7wSwvNOXMWCxJjLJhqz2QGjd85QuY2HYyAP2M=
        }
    ]

        # Seed bookings (previously appointments)
    bookings = []
    for _ in range(20):
            booking = Booking(  # Changed to Booking
                user_id=randint(1, 10),
                stylist_id=randint(1, 5),
                service_id=randint(1, len(services)),
                date_time=fake.date_time_this_year(),
            )
            bookings.append(booking)
    db.session.bulk_save_objects(bookings)

        # Commit all changes
    db.session.commit()

    print("Seeding completed.")

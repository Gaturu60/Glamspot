from app import app, db
from models import User, Stylist, Service, Booking
from datetime import datetime
import random

print("Starting seed...")

with app.app_context():
    # Clear tables in reverse dependency order
    db.session.query(Booking).delete()
    db.session.query(Service).delete()
    db.session.query(Stylist).delete()
    db.session.query(User).delete()
    db.session.commit()

    # 1. Seed Users
    users_data = [
        {"name": "Admin User", "email": "admin@example.com", "role": "admin"},
        {"name": "User1", "email": "user1@example.com", "role": "user"},
        {"name": "User2", "email": "user2@example.com", "role": "user"},
        {"name": "User3", "email": "user3@example.com", "role": "user"},
        {"name": "User4", "email": "user4@example.com", "role": "user"},
    ]
    users = [User(name=data["name"], email=data["email"], role=data["role"]) for data in users_data]
    for user in users:
        user.set_password("password")
    db.session.bulk_save_objects(users)
    db.session.commit()

    # Refresh users to ensure IDs are available
    users = User.query.all()
    user_ids = [user.id for user in users]

    # 2. Seed Stylists
    stylists_data = [
        {"name": "Stylist1", "specialty": "Hair"},
        {"name": "Stylist2", "specialty": "Makeup"},
        {"name": "Stylist3", "specialty": "Nails"},
    ]
    stylists = [Stylist(**data) for data in stylists_data]
    db.session.bulk_save_objects(stylists)
    db.session.commit()

    # Refresh stylists to ensure IDs are available
    stylists = Stylist.query.all()
    stylist_ids = [stylist.id for stylist in stylists]

    # 3. Seed Services
    services_data = [
        {"name": "Haircut", "description": "Basic haircut service", "price": 30.0},
        {"name": "Manicure", "description": "Basic manicure service", "price": 20.0},
        {"name": "Makeup", "description": "Full face makeup", "price": 50.0},
    ]
    services = [Service(**data) for data in services_data]
    db.session.bulk_save_objects(services)
    db.session.commit()

    # Refresh services to ensure IDs are available
    services = Service.query.all()
    service_ids = [service.id for service in services]

    # 4. Seed Bookings
    bookings = [
        Booking(
            user_id=random.choice(user_ids),
            stylist_id=random.choice(stylist_ids),
            service_id=random.choice(service_ids),
            date_time=datetime.now()
        )
        for _ in range(10)
    ]
    db.session.bulk_save_objects(bookings)
    db.session.commit()

    print("Seeding complete!")
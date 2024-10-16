#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Stylist, Service, Appointment

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        
        db.drop_all()
        db.create_all()

        
        users = []
        for _ in range(10):  
            user = User(name=fake.name(), email=fake.unique.email())
            users.append(user)
        db.session.bulk_save_objects(users)

        
        stylists = []
        for _ in range(5):  
            stylist = Stylist(name=fake.name(), specialty=rc(['Hair', 'Nails', 'Makeup', 'Massage']))
            stylists.append(stylist)
        db.session.bulk_save_objects(stylists)

        
        services = []
        service_names = ['Haircut', 'Manicure', 'Pedicure', 'Facial', 'Massage']
        for name in service_names:  
            service = Service(name=name, description=fake.text(max_nb_chars=50))
            services.append(service)
        db.session.bulk_save_objects(services)

        
        appointments = []
        for _ in range(20):  
            appointment = Appointment(
                user_id=randint(1, 10),  
                stylist_id=randint(1, 5),  
                service_id=randint(1, len(services)),  
                date_time=fake.date_time_this_year()
            )
            appointments.append(appointment)
        db.session.bulk_save_objects(appointments)

    
        db.session.commit()

        print("Seeding completed.")

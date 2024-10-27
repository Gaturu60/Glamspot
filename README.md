## Glamspot

Glamspot is a full-stack web application that simplifies the process of booking salon services. Built using React for the frontend and Flask for the backend, Glamspot allows users to browse services, select stylists, and book appointments. It also includes an admin dashboard for managing users and services, enhancing the overall salon booking experience with an intuitive interface.

#### Link to the platform:

https://glamspot-1.onrender.com/

#### Features

1. User Authentication and Authorization

- Sign Up and Log In: Users can easily create accounts and log in.
- Role Identification: Upon login, the system identifies users as either Admin or User, redirecting them to the appropriate interface.

2. Admin Dashboard
   User Management: Admins can perform CRUD operations on users:

- View a comprehensive list of all users.
- Delete users while ensuring that dependent data like bookings is handled correctly.
- Edit user details (name, email, role) and create new services.

3. Salon Services and Stylists

- Service Browsing: Users can browse salon services (e.g., haircuts, manicures) and choose from available stylists based on their specialties (e.g., hair color, nail design).
- Dynamic Service Cards: Service Cards display images fetched from the backend with detailed descriptions and pricing.

4. Booking Appointments
   Appointment Scheduling: Users can book appointments by selecting:

- A service.
- A stylist (based on skills and availability).
- A date and time.
- Notification: Users receive a notification once their booking is successfully created.

5. Protected Routes

- Access Control: Protected routes ensure that only logged-in users can access the booking page and only admins can access the admin dashboard.

6. Role-Based Access Control

- Access Restrictions: The application implements role-based access to ensure:
  - Admins can manage users and services.
  - Users can only access their bookings.

7. Responsive UI and Styling

- Modern Design: The frontend is built using React with Tailwind CSS, ensuring a responsive design that works well on both desktop and mobile devices.

#### Tech Stack

1. Frontend

- React with Vite for fast development and build.
- React Router for client-side routing and protected routes.
- Formik for handling forms and validation.
- Tailwind CSS for responsive styling and consistent UI themes.

2. Backend

- Flask (Python) as the web server and REST API framework.
- Flask-SQLAlchemy for ORM, managing database models and CRUD operations.
- SQLite as the database for managing users, services, stylists, and bookings.
- Flask-CORS for handling cross-origin requests between the frontend and backend.

3. Database Structure

- User Model

  - Attributes: Stores user information (id, name, email, role, password hash).
  - Relationships: One-to-Many with bookings (a user can have multiple bookings).

- Stylist Model

  - Attributes: Stores stylist information (name, specialty).
  - Relationships: Many-to-Many relationship with services (stylists can offer multiple services).

- Service Model
  - Attributes: Stores service details (name, description, price).
  - Relationships: Many-to-Many relationship with stylists (a service can be offered by multiple stylists).
- Booking Model
  - Attributes: Stores booking information (user_id, stylist_id, service_id, date_time).

#### Project Workflow

1. User Workflow

- A user signs up and logs in.
- The user is presented with a list of available services and stylists.
- The user selects a service and stylist, picks a date, and books an appointment.
- The booking is confirmed, and the user can view their upcoming appointments.

2. Admin Workflow

- Admin logs in and accesses the admin dashboard.
- The admin can view and manage all users, including deleting users, updating user details, and managing services.
- The admin ensures that the salon's services are kept up-to-date and users are managed effectively.

#### Security Features

- Session Management
  - User authentication is managed through sessions, ensuring that users remain logged in during their interactions with the platform.

#### Role-Based Access Control

- Admins have access to sensitive parts of the platform, while regular users can only access their own bookings and salon services.

#### Password Security

- Passwords are securely stored using hashed passwords via Flask-Bcrypt.

#### Testing

1. Frontend

- Use React Testing Library to test individual components and simulate user interactions.

2. Backend
   8 Use pytest to test API endpoints, covering authentication, product management, and order creation. Configure tests to run with a temporary in-memory database.

## Glamspot

Glamspot is a full-stack web application that simplifies the process of booking salon services. Built using React for the frontend and Flask for the backend, Glamspot allows users to browse services, select stylists, and book appointments. It also includes an admin dashboard for managing users and services, enhancing the overall salon booking experience with an intuitive interface.

#### Link to the platform:

#### Features

1. User Authentication and Authorization

- Sign Up and Log In: Users can easily create accounts and log in.
- Role Identification: Upon login, the system identifies users as either Admin or User, redirecting them to the appropriate interface.

2. Admin Dashboard
   User Management: Admins can perform CRUD operations on users:

- View a comprehensive list of all users.
- Delete users while ensuring that dependent data like bookings is handled correctly.
- Edit user details (name, email, role) and create new services.

3. Salon Services and Stylists

- Service Browsing: Users can browse salon services (e.g., haircuts, manicures) and choose from available stylists based on their specialties (e.g., hair color, nail design).
- Dynamic Service Cards: Service Cards display images fetched from the backend with detailed descriptions and pricing.

4. Booking Appointments
   Appointment Scheduling: Users can book appointments by selecting:

- A service.
- A stylist (based on skills and availability).
- A date and time.
- Notification: Users receive a notification once their booking is successfully created.

5. Protected Routes

- Access Control: Protected routes ensure that only logged-in users can access the booking page and only admins can access the admin dashboard.

6. Role-Based Access Control

- Access Restrictions: The application implements role-based access to ensure:
  - Admins can manage users and services.
  - Users can only access their bookings.

7. Responsive UI and Styling

- Modern Design: The frontend is built using React with Tailwind CSS, ensuring a responsive design that works well on both desktop and mobile devices.

#### Tech Stack

1. Frontend

- React with Vite for fast development and build.
- React Router for client-side routing and protected routes.
- Formik for handling forms and validation.
- Tailwind CSS for responsive styling and consistent UI themes.

2. Backend

- Flask (Python) as the web server and REST API framework.
- Flask-SQLAlchemy for ORM, managing database models and CRUD operations.
- SQLite as the database for managing users, services, stylists, and bookings.
- Flask-CORS for handling cross-origin requests between the frontend and backend.

3. Database Structure

- User Model

  - Attributes: Stores user information (id, name, email, role, password hash).
  - Relationships: One-to-Many with bookings (a user can have multiple bookings).

- Stylist Model

  - Attributes: Stores stylist information (name, specialty).
  - Relationships: Many-to-Many relationship with services (stylists can offer multiple services).

- Service Model
  - Attributes: Stores service details (name, description, price).
  - Relationships: Many-to-Many relationship with stylists (a service can be offered by multiple stylists).
- Booking Model
  - Attributes: Stores booking information (user_id, stylist_id, service_id, date_time).

#### Project Workflow

1. User Workflow

- A user signs up and logs in.
- The user is presented with a list of available services and stylists.
- The user selects a service and stylist, picks a date, and books an appointment.
- The booking is confirmed, and the user can view their upcoming appointments.

2. Admin Workflow

- Admin logs in and accesses the admin dashboard.
- The admin can view and manage all users, including deleting users, updating user details, and managing services.
- The admin ensures that the salon's services are kept up-to-date and users are managed effectively.

#### Security Features

- Session Management
  - User authentication is managed through sessions, ensuring that users remain logged in during their interactions with the platform.

#### Role-Based Access Control

- Admins have access to sensitive parts of the platform, while regular users can only access their own bookings and salon services.

#### Password Security

- Passwords are securely stored using hashed passwords via Flask-Bcrypt.

#### Testing

1. Frontend

- Use React Testing Library to test individual components and simulate user interactions.

2. Backend
   8 Use pytest to test API endpoints, covering authentication, product management, and order creation. Configure tests to run with a temporary in-memory database.

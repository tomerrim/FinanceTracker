from faker import Faker
from random import randint
from datetime import datetime, timedelta
from database import db, Payment, User  # Import your SQLAlchemy models
from main import app
fake = Faker()

# Function to create dummy users
def create_dummy_users(num_users):
    users = []
    for _ in range(num_users):
        user = User(
            name=fake.name(),
            email=fake.email(),
            password=fake.password(),
        )
        users.append(user)
        db.session.add(user)
    db.session.commit()
    return users

# Function to create dummy payments associated with users
def create_dummy_payments(users, num_payments_per_user):
    categories = ["Groceries", "Rent", "Utilities", "Entertainment", "Others"]
    payment_methods = ["Credit Card", "Cash", "Bank Transfer"]

    for user in users:
        for _ in range(num_payments_per_user):
            payment = Payment(
                title=fake.sentence(),
                date=fake.date_between(start_date='-30d', end_date='today'),
                money=randint(10, 500),
                category=fake.random_element(categories),
                payment_method=fake.random_element(payment_methods),
                user=user
            )
            db.session.add(payment)
    db.session.commit()

# Generate dummy data
num_dummy_users = 5
num_payments_per_user = 10

with app.app_context():
    dummy_users = create_dummy_users(num_dummy_users)
    create_dummy_payments(dummy_users, num_payments_per_user)

print(dummy_users)

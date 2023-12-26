from flask import Flask, jsonify, request, flash, redirect, url_for
from flask_cors import CORS
import logging
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, LoginManager, current_user, logout_user
from sqlalchemy.exc import IntegrityError, DataError
from database import db, Payment, User

app = Flask(__name__)

CORS(app)

# Set log level and file handler
app.logger.setLevel(logging.DEBUG)
file_handler = logging.FileHandler("app.log")
file_handler.setLevel(logging.DEBUG)

# Define log format
formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
file_handler.setFormatter(formatter)

app.logger.addHandler(file_handler)

login_manager = LoginManager()
login_manager.init_app(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///finance-tracker.db"
db.init_app(app)

with app.app_context():
    db.create_all()


@app.route("/")
def home():
    all_users = User.query.all()
    return jsonify({"users": "welcome"})


@app.route("/signUp", methods=["POST"])
def sign_up():
    try:
        name = request.form.get("name")
        email = request.form.get("email")

        result = db.session.execute(db.select(User).where(User.email == email))
        user = result.scalar()
        if user:
            flash("You've already signed up with that email. Log in instead!")
            return redirect(url_for("sign_in"))

        password = request.form.get("password")
        secured_password = generate_password_hash(
            password=password, method="pbkdf2:sha256", salt_length=8
        )
        new_user = User(email=email, name=name, password=secured_password)
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user)
        return jsonify({"success": "Successfully registered new user"}), 201
    except Exception as e:
        app.logger.error(f"Error during sign up: {str(e)}")
        flash("An error occured while signing up. Please try Again.")
        return redirect(url_for("signUp"))


@app.route("/signIn", methods=["POST"])
def sign_in():
    pass


@app.route("/<int:user_id>/finance")
def get_finance_by_user(user_id):
    user = db.get_or_404(User, user_id)
    if user:
        user_payments = user.payments

        payments_list = [
            {
                "id": payment.id,
                "title": payment.title,
                "date": payment.date.strftime("%Y-%m-%d"),
                "money": payment.money,
                "category": payment.category,
                "payment_method": payment.payment_method
            }
            for payment in user_payments
        ]
        return jsonify({"user_payments": payments_list}), 200
    return jsonify({"message": "User not found"}), 404


@app.route("/addExpense", methods=["POST"])
def add_expense():
    try:
        title = request.form.get("title")
        money = request.form.get("money")
        category = request.form.get("category")
        date = request.form.get("date")
        payment_method = request.form.get("payment_method")
        new_payment = Payment(
            title=title,
            money=money,
            category=category,
            date=date,
            payment_method=payment_method,
        )
        db.session.add(new_payment)
        db.session.commit()
        return jsonify({"message": "Expense added successfully"}), 201
    except (IntegrityError, DataError) as e:
        app.logger.error(f"Failed to add expense: {str(e)}")
        return jsonify({"error": "Invalid data. Failed to add expense."}), 400
    except Exception as e:
        app.logger.error(f"Failed to add expense: {str(e)}")
        return jsonify({"error": "Failed to add expense. Internal Server Error "}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5001)

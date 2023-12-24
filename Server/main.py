from flask import Flask, jsonify, request, flash, redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, LoginManager, current_user, logout_user
from database import db, Payment, User

app = Flask(__name__)

login_manager = LoginManager()
login_manager.init_app(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///finance-tracker.db'
db.init_app(app)

with app.app_context():
    db.create_all()


@app.route('/register', methods=['POST'])
def register():
    name = request.form.get("name")
    email = request.form.get("email")

    result = db.session.execute(db.select(User).where(User.email == email))
    user = result.scalar()
    if user:
        flash("You've already signed up with that email. Log in instead!")
        redirect(url_for('login'))

    password = request.form.get("password")
    secured_password = generate_password_hash(password=password, method='pbkdf2:sha256', salt_length=8)
    new_user = User(email=email, name=name, password=secured_password)
    db.session.add(new_user)
    db.session.commit()
    logout_user(new_user)
    return jsonify(response={"success": "Successfully registered new user"}), 201


if __name__ == "__main__":
    app.run(debug=True, port=5001)

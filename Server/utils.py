import smtplib
from dotenv import load_dotenv
from datetime import datetime
import os

load_dotenv()

system_email = os.getenv("EMAIL")
password = os.getenv("EMAIL_PASSWORD")


def send_email_notification(email):
    msg = "You spent more than 1000₪ this month."
    with smtplib.SMTP("smtp.gmail.com") as connection:
        connection.starttls()
        connection.login(user=system_email, password=password)
        connection.sendmail(from_addr=system_email, to_addrs=email,
                            msg=f"Subject:Expense Tracker\n\n{msg}")

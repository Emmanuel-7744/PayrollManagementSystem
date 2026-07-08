from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
jwt = JWTManager()

from app.models import *
from app.routes.auth import auth
from app.routes.employee import employee
from app.routes.attendance import attendance
from app.routes.leave import leave
from app.routes.salary import salary



def create_app():
    app = Flask(__name__)
    app.config.from_object("config.Config")

    CORS(app)

    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(auth)
    app.register_blueprint(attendance)
    app.register_blueprint(employee)
    app.register_blueprint(leave)
    app.register_blueprint(salary)

    @app.route("/")
    def home():
        return {
            "message": "Payroll Management System Backend is Running!"
        }

    return app
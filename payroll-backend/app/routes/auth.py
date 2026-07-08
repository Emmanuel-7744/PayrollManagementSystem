from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity

)
from app import db, bcrypt
from app.models.user import User

auth = Blueprint("auth", __name__)

@auth.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    hashed_password = bcrypt.generate_password_hash(
        data["password"]
     ).decode("utf-8")

    user = User(

        name=data["name"],

        email=data["email"],

        password=hashed_password,

        role=data["role"]

    )

    db.session.add(user)

    db.session.commit()

    return jsonify({

        "message": "User registered successfully"

    }), 201

@auth.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    print(data)
    print(type(data))

    user = User.query.filter_by(email=data["email"]).first()

    if not user:
        return jsonify({"message": "Invalid email or password"}), 401
    

    if not bcrypt.check_password_hash(
        user.password,
        data["password"]

    ):

        return jsonify({"message": "Invalid email or password"}), 401

    access_token = create_access_token(identity=str(user.id))
    
    return jsonify({

        "message": "Login successful",

        "access_token": access_token,

        "user": {

            "id": user.id,

            "name": user.name,

            "email": user.email,

            "role": user.role

        }

    }), 200

@auth.route("/profile", methods=["GET"])

@jwt_required()

def profile():

    current_user = get_jwt_identity()

    return jsonify({

        "message": "Access granted",

        "user": current_user

    }), 200
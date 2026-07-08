from functools import wraps
from flask_jwt_extended import get_jwt_identity
from app.models.user import User
from flask import jsonify

def role_required(role):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            user_id = get_jwt_identity()
            user = User.query.get(int(user_id))

            if not user or user.role != role:
                return jsonify({
                    "message": "Access denied"
                }), 403

            return fn(*args, **kwargs)

        return decorator
    return wrapper
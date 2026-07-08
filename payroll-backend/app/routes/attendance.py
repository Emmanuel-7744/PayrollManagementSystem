from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app import db
from app.models.attendance import Attendance
from app.models.employee import Employee
from app.utils.role_required import role_required

attendance = Blueprint("attendance", __name__)
@attendance.route("/attendance", methods=["POST"])
@jwt_required()
@role_required("admin")
def mark_attendance():
    data = request.get_json()
    employee = Employee.query.get(data["employee_id"])
    if not employee:

        return jsonify({
            "message": "Employee not found"

        }), 404

    record = Attendance(

        employee_id=data["employee_id"],

        status=data["status"]

    )

    db.session.add(record)

    db.session.commit()

    return jsonify({
        "message": "Attendance marked successfully"
    }), 201

    print("GET attendance route loaded")

    @attendance.route("/attendance", methods=["GET"])
    @jwt_required()
    def get_attendance():
        records = Attendance.query.all()

        result = []

        for record in records:
            result.append({
            "id": record.id,
            "employee_id": record.employee_id,
            "date": str(record.date),
            "status": record.status
        })

    return jsonify(result), 200
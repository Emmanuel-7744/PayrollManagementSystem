from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app import db
from app.models.leave import Leave
from app.models.employee import Employee

leave = Blueprint("leave", __name__)
@leave.route("/leave", methods=["POST"])
@jwt_required()
def apply_leave():
    data = request.get_json()

    employee = Employee.query.get(data["employee_id"])

    if not employee:
        return jsonify({
            "message": "Employee not found"
        }), 404
    start_date = datetime.strptime(
        data["start_date"], "%Y-%m-%d"
    ).date()

    end_date = datetime.strptime(
        data["end_date"], "%Y-%m-%d"
    ).date()

    leave_request = Leave(
        employee_id=data["employee_id"],
        reason=data["reason"],
        start_date=start_date,
        end_date=end_date
    )
            
    db.session.add(leave_request)
    db.session.commit()

    return jsonify({
        "message": "Leave request submitted"
    }), 201
@leave.route("/leaves", methods=["GET"])
@jwt_required()
def get_leaves():
    leaves = Leave.query.all()

    result = []

    for leave_request in leaves:
        result.append({
            "id": leave_request.id,
            "employee_id": leave_request.employee_id,
            "reason": leave_request.reason,
            "start_date": str(leave_request.start_date),
            "end_date": str(leave_request.end_date),
            "status": leave_request.status
        })

    return jsonify(result), 200
@leave.route("/leave/<int:id>", methods=["PUT"])
@jwt_required()
def update_leave_status(id):
    data = request.get_json()

    leave_request = Leave.query.get(id)

    if not leave_request:
        return jsonify({
            "message": "Leave request not found"
        }), 404

    leave_request.status = data["status"]

    db.session.commit()

    return jsonify({
        "message": "Leave status updated"
    }), 200
@leave.route("/leave/<int:id>", methods=["PUT"])
@jwt_required()
def update_leave(id):
    leave_request = Leave.query.get(id)

    if not leave_request:
        return jsonify({
            "message": "Leave not found"
        }), 404

    data = request.get_json()

    leave_request.status = data["status"]

    db.session.commit()

    return jsonify({
        "message": "Leave updated successfully"
    }), 200
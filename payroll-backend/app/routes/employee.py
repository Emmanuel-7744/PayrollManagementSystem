from app.utils.role_required import role_required
from flask_jwt_extended import jwt_required
from app.utils.auth import get_current_user
from flask_jwt_extended import jwt_required
from flask import Blueprint, request, jsonify
from app import db
from app.models.employee import Employee

employee = Blueprint("employee", __name__)

@employee.route("/employees", methods=["POST"])
@jwt_required()
@role_required("admin")
def add_employee():

    current_user = get_current_user()

    if current_user.role != "admin":
        return jsonify({
            "message": "Access denied"
        }), 403

    data = request.get_json()

    new_employee = Employee(
        ...
    )

    return jsonify({
        "message": "Employee added successfully"
    }), 201
@employee.route("/employees", methods=["GET"])
@jwt_required()
def get_employees():
    employees = Employee.query.all()

    result = []

    for emp in employees:
        result.append({
            "id": emp.id,
            "employee_id": emp.employee_id,
            "name": emp.name,
            "email": emp.email,
            "department": emp.department,
            "position": emp.position,
            "salary": emp.salary

        })

    return jsonify(result), 200
@employee.route("/employees/<int:id>", methods=["GET"])
@jwt_required()
def get_employee(id):
    emp = Employee.query.get(id)

    if not emp:
        return jsonify({
            "message": "Employee not found"
        }), 404

    return jsonify({
        "id": emp.id,
        "employee_id": emp.employee_id,
        "name": emp.name,
        "email": emp.email,
        "department": emp.department,
        "position": emp.position,
        "salary": emp.salary
    }), 200
@employee.route("/employees/<int:id>", methods=["PUT"])
@jwt_required()
@role_required("admin")
def update_employee(id):
    emp = Employee.query.get(id)

    if not emp:
        return jsonify({
            "message": "Employee not found"
        }), 404

    data = request.get_json()

    emp.employee_id = data["employee_id"]
    emp.name = data["name"]
    emp.email = data["email"]
    emp.department = data["department"]
    emp.position = data["position"]
    emp.salary = data["salary"]

    db.session.commit()

    return jsonify({
        "message": "Employee updated successfully"
    }), 200
@employee.route("/employees/<int:id>", methods=["DELETE"])
@jwt_required()
@role_required("admin")
def delete_employee(id):
    emp = Employee.query.get(id)

    if not emp:
        return jsonify({
            "message": "Employee not found"
        }), 404

    db.session.delete(emp)
    db.session.commit()

    return jsonify({
        "message": "Employee deleted successfully"
    }), 200
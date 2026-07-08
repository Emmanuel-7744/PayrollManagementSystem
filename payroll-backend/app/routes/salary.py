from flask import Blueprint, request, jsonify, send_file
from flask_jwt_extended import jwt_required

import io
from reportlab.pdfgen import canvas


from app import db
from app.models.salary import Salary
from app.models.employee import Employee

salary = Blueprint("salary", __name__)


@salary.route("/salary", methods=["POST"])
@jwt_required()
def create_salary():

    data = request.get_json()

    employee = Employee.query.get(data["employee_id"])

    if not employee:
        return jsonify({
            "message": "Employee not found"
        }), 404

    salary_record = Salary(
        employee_id=data["employee_id"],
        basic=data["basic"],
        hra=data["hra"],
        da=data["da"],
        special_allowance=data["special_allowance"],
        pf=data["pf"],
        esi=data["esi"],
        tds=data["tds"]
    )

    db.session.add(salary_record)
    db.session.commit()

    return jsonify({
        "message": "Salary structure created"
    }), 201


@salary.route("/salary", methods=["GET"])
@jwt_required()
def get_salary():

    salaries = Salary.query.all()

    result = []

    for s in salaries:
        result.append({
            "id": s.id,
            "employee_id": s.employee_id,
            "basic": s.basic,
            "hra": s.hra,
            "da": s.da,
            "special_allowance": s.special_allowance,
            "pf": s.pf,
            "esi": s.esi,
            "tds": s.tds
        })

    return jsonify(result), 200
@salary.route("/salary/calculate/<int:employee_id>", methods=["GET"])
@jwt_required()
def calculate_salary(employee_id):

    salary = Salary.query.filter_by(employee_id=employee_id).first()
    employee = Employee.query.get(employee_id)

    if not salary:
        return jsonify({
            "message": "Salary record not found"
        }), 404

    gross_salary = (
        salary.basic +
        salary.hra +
        salary.da +
        salary.special_allowance
    )

    deductions = (
        salary.pf +
        salary.esi +
        salary.tds
    )

    net_salary = gross_salary - deductions
    
    buffer = io.BytesIO()

    pdf = canvas.Canvas(buffer)
    pdf.setTitle("Employee Payslip")

    pdf.drawString(200, 800, "PAYSLIP")

    pdf.drawString(50, 760, f"Employee ID : {employee.id}")
    pdf.drawString(50, 740, f"Employee Name : {employee.name}")

    pdf.drawString(50, 700, f"Basic Salary : {salary.basic}")
    pdf.drawString(50, 680, f"HRA : {salary.hra}")
    pdf.drawString(50, 660, f"DA : {salary.da}")
    pdf.drawString(50, 640, f"Special Allowance : {salary.special_allowance}")

    pdf.drawString(50, 600, f"Gross Salary : {gross_salary}")

    pdf.drawString(50, 560, f"PF : {salary.pf}")
    pdf.drawString(50, 540, f"ESI : {salary.esi}")
    pdf.drawString(50, 520, f"TDS : {salary.tds}")

    pdf.drawString(50, 480, f"Total Deductions : {deductions}")

    pdf.drawString(50, 440, f"Net Salary : {net_salary}")

    pdf.save()

    buffer.seek(0)

    return send_file(
    buffer,
    as_attachment=True,
    download_name=f"Payslip_{employee.id}.pdf",
    mimetype="application/pdf"
)

@salary.route("/salary/payslip/<int:employee_id>", methods=["GET"])
@jwt_required()
def generate_payslip(employee_id):
    return calculate_salary(employee_id)
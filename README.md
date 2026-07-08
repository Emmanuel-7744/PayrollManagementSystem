# Payroll Management System

A Payroll Management System backend built using Flask.

## Features

- JWT Authentication
- Employee Management (CRUD)
- Attendance Management
- Leave Management
- Salary Management
- Salary Calculation
- Payslip PDF Generation (ReportLab)

## Technologies Used

- Python
- Flask
- Flask-JWT-Extended
- SQLAlchemy
- SQLite
- ReportLab

## Project Structure

```
payroll-backend/
├── app/
├── migrations/
├── requirements.txt
└── run.py
```

## Run the Project

```bash
pip install -r payroll-backend/requirements.txt
cd payroll-backend
flask --app run.py --debug run
```
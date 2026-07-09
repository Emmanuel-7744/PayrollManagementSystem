# Payroll Management System

A full-stack Payroll Management System developed using React (Frontend) and Flask (Backend).

## Features

- Secure Login Authentication
- Dashboard
- Employee Management
  - Add Employee
  - Edit Employee
  - Delete Employee
  - Search Employee
- Attendance Management
  - Mark Attendance
  - Edit Attendance
  - Delete Attendance
- Leave Management
- Salary Management
- Payslip Management

## Tech Stack

### Frontend
- React.js
- React Router
- React Icons
- Axios
- Vite

### Backend
- Python
- Flask
- Flask-JWT-Extended
- SQLAlchemy
- SQLite

## Project Structure

```
PayrollManagementSystem/
│
├── payroll-backend/
│   ├── app/
│   ├── migrations/
│   ├── run.py
│   └── requirements.txt
│
├── payroll-frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Installation

### Backend

```bash
cd payroll-backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python run.py
```

### Frontend

```bash
cd payroll-frontend
npm install
npm run dev
```

## Login

Use the credentials available in your backend database.

## Author

Emmanuel John
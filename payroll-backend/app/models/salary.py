from app import db

class Salary(db.Model):
    __tablename__ = "salary"

    id = db.Column(db.Integer, primary_key=True)

    employee_id = db.Column(db.Integer, db.ForeignKey("employees.id"), nullable=False)

    basic = db.Column(db.Float, nullable=False)
    hra = db.Column(db.Float, nullable=False)
    da = db.Column(db.Float, nullable=False)
    special_allowance = db.Column(db.Float, nullable=False)

    pf = db.Column(db.Float, nullable=False)
    esi = db.Column(db.Float, nullable=False)
    tds = db.Column(db.Float, nullable=False)
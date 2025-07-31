from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
import json

class Student(db.Model):
    __tablename__ = 'students'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    
    # Personal Information
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(20))
    whatsapp_number = db.Column(db.String(20))
    date_of_birth = db.Column(db.Date)
    gender = db.Column(db.String(10))
    
    # Location
    country = db.Column(db.String(50))
    city = db.Column(db.String(50))
    
    # Education
    education_level = db.Column(db.String(50))  # Elementary, Middle School, High School, University
    school_name = db.Column(db.String(100))
    grade_year = db.Column(db.String(20))
    
    # Preferences
    preferred_subjects = db.Column(db.Text)  # JSON string
    preferred_languages = db.Column(db.Text)  # JSON string
    learning_goals = db.Column(db.Text)
    
    # Account Status
    is_active = db.Column(db.Boolean, default=True)
    is_verified = db.Column(db.Boolean, default=False)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login = db.Column(db.DateTime)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def set_preferred_subjects(self, subjects_list):
        self.preferred_subjects = json.dumps(subjects_list) if subjects_list else None
    
    def get_preferred_subjects(self):
        return json.loads(self.preferred_subjects) if self.preferred_subjects else []
    
    def set_preferred_languages(self, languages_list):
        self.preferred_languages = json.dumps(languages_list) if languages_list else None
    
    def get_preferred_languages(self):
        return json.loads(self.preferred_languages) if self.preferred_languages else []
    
    def to_dict(self, include_sensitive=False):
        data = {
            'id': self.id,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone': self.phone,
            'whatsapp_number': self.whatsapp_number,
            'country': self.country,
            'city': self.city,
            'education_level': self.education_level,
            'school_name': self.school_name,
            'grade_year': self.grade_year,
            'preferred_subjects': self.get_preferred_subjects(),
            'preferred_languages': self.get_preferred_languages(),
            'learning_goals': self.learning_goals,
            'is_active': self.is_active,
            'is_verified': self.is_verified,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'last_login': self.last_login.isoformat() if self.last_login else None
        }
        
        if include_sensitive:
            data.update({
                'email': self.email,
                'date_of_birth': self.date_of_birth.isoformat() if self.date_of_birth else None,
                'gender': self.gender
            })
        
        return data



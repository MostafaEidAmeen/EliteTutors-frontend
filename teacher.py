from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from . import db

class Teacher(db.Model):
    __tablename__ = 'teachers'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    
    # Personal Information
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(20))
    whatsapp_number = db.Column(db.String(20))
    country = db.Column(db.String(50))
    city = db.Column(db.String(50))
    
    # Professional Information
    title = db.Column(db.String(100))  # e.g., "Dr.", "Prof.", "Mr.", "Ms."
    bio = db.Column(db.Text)
    subjects_taught = db.Column(db.Text)  # JSON string of subjects
    education_levels = db.Column(db.Text)  # JSON string of levels (Kindergarten, Elementary, etc.)
    experience_years = db.Column(db.Integer)
    hourly_rate = db.Column(db.Float)
    languages = db.Column(db.Text)  # JSON string of languages
    specialties = db.Column(db.Text)  # JSON string of specialties
    education_background = db.Column(db.Text)  # JSON string of education
    
    # Availability and Schedule
    availability_schedule = db.Column(db.Text)  # JSON string of weekly schedule
    response_time = db.Column(db.String(50))  # e.g., "2 hours", "Same day"
    
    # Profile and Media
    profile_image_url = db.Column(db.String(255))
    
    # Administrative Fields
    admin_notes = db.Column(db.Text)  # Notes from administrators
    is_approved = db.Column(db.Boolean, default=False)  # Admin approval status
    is_active = db.Column(db.Boolean, default=True)
    can_edit_profile = db.Column(db.Boolean, default=True)  # Admin control over editing
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login = db.Column(db.DateTime)
    
    # Statistics (read-only for teachers)
    total_sessions = db.Column(db.Integer, default=0)
    total_students = db.Column(db.Integer, default=0)
    average_rating = db.Column(db.Float, default=0.0)
    total_reviews = db.Column(db.Integer, default=0)
    profile_views = db.Column(db.Integer, default=0)
    
    def set_password(self, password):
        """Set password hash"""
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        """Check password against hash"""
        return check_password_hash(self.password_hash, password)
    
    def get_subjects_list(self):
        """Get subjects as a list"""
        import json
        try:
            return json.loads(self.subjects_taught) if self.subjects_taught else []
        except:
            return []
    
    def set_subjects_list(self, subjects):
        """Set subjects from a list"""
        import json
        self.subjects_taught = json.dumps(subjects)
    
    def get_education_levels_list(self):
        """Get education levels as a list"""
        import json
        try:
            return json.loads(self.education_levels) if self.education_levels else []
        except:
            return []
    
    def set_education_levels_list(self, levels):
        """Set education levels from a list"""
        import json
        self.education_levels = json.dumps(levels)
    
    def get_languages_list(self):
        """Get languages as a list"""
        import json
        try:
            return json.loads(self.languages) if self.languages else []
        except:
            return []
    
    def set_languages_list(self, languages):
        """Set languages from a list"""
        import json
        self.languages = json.dumps(languages)
    
    def get_specialties_list(self):
        """Get specialties as a list"""
        import json
        try:
            return json.loads(self.specialties) if self.specialties else []
        except:
            return []
    
    def set_specialties_list(self, specialties):
        """Set specialties from a list"""
        import json
        self.specialties = json.dumps(specialties)
    
    def get_availability_schedule(self):
        """Get availability schedule as a dict"""
        import json
        try:
            return json.loads(self.availability_schedule) if self.availability_schedule else {}
        except:
            return {}
    
    def set_availability_schedule(self, schedule):
        """Set availability schedule from a dict"""
        import json
        self.availability_schedule = json.dumps(schedule)
    
    def get_education_background(self):
        """Get education background as a list"""
        import json
        try:
            return json.loads(self.education_background) if self.education_background else []
        except:
            return []
    
    def set_education_background(self, education):
        """Set education background from a list"""
        import json
        self.education_background = json.dumps(education)
    
    def to_dict(self, include_sensitive=False):
        """Convert teacher to dictionary"""
        data = {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone': self.phone,
            'whatsapp_number': self.whatsapp_number,
            'country': self.country,
            'city': self.city,
            'title': self.title,
            'bio': self.bio,
            'subjects_taught': self.get_subjects_list(),
            'education_levels': self.get_education_levels_list(),
            'experience_years': self.experience_years,
            'hourly_rate': self.hourly_rate,
            'languages': self.get_languages_list(),
            'specialties': self.get_specialties_list(),
            'education_background': self.get_education_background(),
            'availability_schedule': self.get_availability_schedule(),
            'response_time': self.response_time,
            'profile_image_url': self.profile_image_url,
            'is_approved': self.is_approved,
            'is_active': self.is_active,
            'can_edit_profile': self.can_edit_profile,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'last_login': self.last_login.isoformat() if self.last_login else None,
            'total_sessions': self.total_sessions,
            'total_students': self.total_students,
            'average_rating': self.average_rating,
            'total_reviews': self.total_reviews,
            'profile_views': self.profile_views
        }
        
        if include_sensitive:
            data['admin_notes'] = self.admin_notes
        
        return data
    
    def __repr__(self):
        return f'<Teacher {self.username}>'


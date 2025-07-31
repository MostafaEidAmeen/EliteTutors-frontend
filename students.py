from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from datetime import datetime, timedelta
from ..models.student import Student
from ..models import db
import re

students_bp = Blueprint('students', __name__)

def validate_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

@students_bp.route('/register', methods=['POST'])
def register_student():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['username', 'email', 'password', 'first_name', 'last_name']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Validate email format
        if not validate_email(data['email']):
            return jsonify({'error': 'Invalid email format'}), 400
        
        # Check if username or email already exists
        if Student.query.filter_by(username=data['username']).first():
            return jsonify({'error': 'Username already exists'}), 400
        
        if Student.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already exists'}), 400
        
        # Create new student
        student = Student(
            username=data['username'],
            email=data['email'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            phone=data.get('phone'),
            whatsapp_number=data.get('whatsapp_number'),
            country=data.get('country'),
            city=data.get('city'),
            education_level=data.get('education_level'),
            school_name=data.get('school_name'),
            grade_year=data.get('grade_year'),
            learning_goals=data.get('learning_goals'),
            gender=data.get('gender')
        )
        
        student.set_password(data['password'])
        
        # Set lists if provided
        if data.get('preferred_subjects'):
            student.set_preferred_subjects(data['preferred_subjects'])
        if data.get('preferred_languages'):
            student.set_preferred_languages(data['preferred_languages'])
        
        # Parse date of birth if provided
        if data.get('date_of_birth'):
            try:
                student.date_of_birth = datetime.strptime(data['date_of_birth'], '%Y-%m-%d').date()
            except ValueError:
                return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400
        
        db.session.add(student)
        db.session.commit()
        
        return jsonify({
            'message': 'Student registered successfully',
            'student': student.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@students_bp.route('/login', methods=['POST'])
def login_student():
    try:
        data = request.get_json()
        
        if not data.get('username') or not data.get('password'):
            return jsonify({'error': 'Username and password are required'}), 400
        
        student = Student.query.filter_by(username=data['username']).first()
        
        if not student or not student.check_password(data['password']):
            return jsonify({'error': 'Invalid username or password'}), 401
        
        if not student.is_active:
            return jsonify({'error': 'Account is deactivated'}), 401
        
        # Update last login
        student.last_login = datetime.utcnow()
        db.session.commit()
        
        # Create access token
        access_token = create_access_token(
            identity=student.id,
            expires_delta=timedelta(days=7),
            additional_claims={'role': 'student'}
        )
        
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'student': student.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@students_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_student_profile():
    try:
        student_id = get_jwt_identity()
        student = Student.query.get(student_id)
        
        if not student:
            return jsonify({'error': 'Student not found'}), 404
        
        return jsonify({
            'student': student.to_dict(include_sensitive=True)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@students_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_student_profile():
    try:
        student_id = get_jwt_identity()
        student = Student.query.get(student_id)
        
        if not student:
            return jsonify({'error': 'Student not found'}), 404
        
        data = request.get_json()
        
        # Update allowed fields
        updatable_fields = [
            'first_name', 'last_name', 'phone', 'whatsapp_number',
            'country', 'city', 'education_level', 'school_name',
            'grade_year', 'learning_goals', 'gender'
        ]
        
        for field in updatable_fields:
            if field in data:
                setattr(student, field, data[field])
        
        # Handle special fields
        if 'preferred_subjects' in data:
            student.set_preferred_subjects(data['preferred_subjects'])
        
        if 'preferred_languages' in data:
            student.set_preferred_languages(data['preferred_languages'])
        
        if 'date_of_birth' in data and data['date_of_birth']:
            try:
                student.date_of_birth = datetime.strptime(data['date_of_birth'], '%Y-%m-%d').date()
            except ValueError:
                return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400
        
        student.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Profile updated successfully',
            'student': student.to_dict(include_sensitive=True)
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@students_bp.route('/all', methods=['GET'])
@jwt_required()
def get_all_students():
    """Admin endpoint to get all students"""
    try:
        # This should be restricted to admin users only
        students = Student.query.all()
        return jsonify({
            'students': [student.to_dict() for student in students],
            'total': len(students)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


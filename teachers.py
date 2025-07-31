from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from datetime import datetime, timedelta
from ..models.teacher import Teacher
from ..models import db
import re

teachers_bp = Blueprint('teachers', __name__)

def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_phone(phone):
    """Validate phone number format"""
    if not phone:
        return True  # Phone is optional
    pattern = r'^\+?[1-9]\d{1,14}$'
    return re.match(pattern, phone) is not None

@teachers_bp.route('/register', methods=['POST'])
def register_teacher():
    """Register a new teacher"""
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
        
        # Validate phone if provided
        if data.get('phone') and not validate_phone(data['phone']):
            return jsonify({'error': 'Invalid phone number format'}), 400
        
        # Check if username or email already exists
        if Teacher.query.filter_by(username=data['username']).first():
            return jsonify({'error': 'Username already exists'}), 400
        
        if Teacher.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already exists'}), 400
        
        # Create new teacher
        teacher = Teacher(
            username=data['username'],
            email=data['email'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            phone=data.get('phone'),
            whatsapp_number=data.get('whatsapp_number'),
            country=data.get('country'),
            city=data.get('city'),
            title=data.get('title'),
            bio=data.get('bio'),
            experience_years=data.get('experience_years', 0),
            hourly_rate=data.get('hourly_rate', 0.0),
            response_time=data.get('response_time', '24 hours'),
            is_approved=False,  # Requires admin approval
            can_edit_profile=True  # Default: can edit
        )
        
        teacher.set_password(data['password'])
        
        # Set lists if provided
        if data.get('subjects_taught'):
            teacher.set_subjects_list(data['subjects_taught'])
        if data.get('education_levels'):
            teacher.set_education_levels_list(data['education_levels'])
        if data.get('languages'):
            teacher.set_languages_list(data['languages'])
        if data.get('specialties'):
            teacher.set_specialties_list(data['specialties'])
        if data.get('education_background'):
            teacher.set_education_background(data['education_background'])
        if data.get('availability_schedule'):
            teacher.set_availability_schedule(data['availability_schedule'])
        
        db.session.add(teacher)
        db.session.commit()
        
        return jsonify({
            'message': 'Teacher registered successfully. Awaiting admin approval.',
            'teacher': teacher.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@teachers_bp.route('/login', methods=['POST'])
def login_teacher():
    """Teacher login"""
    try:
        data = request.get_json()
        
        if not data.get('username') or not data.get('password'):
            return jsonify({'error': 'Username and password are required'}), 400
        
        teacher = Teacher.query.filter_by(username=data['username']).first()
        
        if not teacher or not teacher.check_password(data['password']):
            return jsonify({'error': 'Invalid username or password'}), 401
        
        if not teacher.is_active:
            return jsonify({'error': 'Account is deactivated'}), 401
        
        if not teacher.is_approved:
            return jsonify({'error': 'Account is pending admin approval'}), 401
        
        # Update last login
        teacher.last_login = datetime.utcnow()
        db.session.commit()
        
        # Create access token
        access_token = create_access_token(
            identity=teacher.id,
            expires_delta=timedelta(days=7),
            additional_claims={'role': 'teacher'}
        )
        
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'teacher': teacher.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@teachers_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_teacher_profile():
    """Get teacher's own profile"""
    try:
        teacher_id = get_jwt_identity()
        teacher = Teacher.query.get(teacher_id)
        
        if not teacher:
            return jsonify({'error': 'Teacher not found'}), 404
        
        return jsonify({
            'teacher': teacher.to_dict(include_sensitive=True)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@teachers_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_teacher_profile():
    """Update teacher's own profile"""
    try:
        teacher_id = get_jwt_identity()
        teacher = Teacher.query.get(teacher_id)
        
        if not teacher:
            return jsonify({'error': 'Teacher not found'}), 404
        
        if not teacher.can_edit_profile:
            return jsonify({'error': 'Profile editing is disabled by administrator'}), 403
        
        data = request.get_json()
        
        # Update allowed fields
        updatable_fields = [
            'first_name', 'last_name', 'phone', 'whatsapp_number', 
            'city', 'title', 'bio', 'experience_years', 'hourly_rate', 
            'response_time', 'profile_image_url'
        ]
        
        for field in updatable_fields:
            if field in data:
                setattr(teacher, field, data[field])
        
        # Validate phone if provided
        if data.get('phone') and not validate_phone(data['phone']):
            return jsonify({'error': 'Invalid phone number format'}), 400
        
        # Update lists if provided
        if 'subjects_taught' in data:
            teacher.set_subjects_list(data['subjects_taught'])
        if 'education_levels' in data:
            teacher.set_education_levels_list(data['education_levels'])
        if 'languages' in data:
            teacher.set_languages_list(data['languages'])
        if 'specialties' in data:
            teacher.set_specialties_list(data['specialties'])
        if 'education_background' in data:
            teacher.set_education_background(data['education_background'])
        if 'availability_schedule' in data:
            teacher.set_availability_schedule(data['availability_schedule'])
        
        teacher.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Profile updated successfully',
            'teacher': teacher.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Admin routes for managing teachers
@teachers_bp.route('/admin/teachers', methods=['GET'])
@jwt_required()
def get_all_teachers():
    """Get all teachers (admin only)"""
    try:
        # TODO: Add admin role verification
        
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        search = request.args.get('search', '')
        status = request.args.get('status', 'all')  # all, approved, pending, inactive
        
        query = Teacher.query
        
        # Apply search filter
        if search:
            query = query.filter(
                db.or_(
                    Teacher.first_name.ilike(f'%{search}%'),
                    Teacher.last_name.ilike(f'%{search}%'),
                    Teacher.username.ilike(f'%{search}%'),
                    Teacher.email.ilike(f'%{search}%')
                )
            )
        
        # Apply status filter
        if status == 'approved':
            query = query.filter(Teacher.is_approved == True)
        elif status == 'pending':
            query = query.filter(Teacher.is_approved == False)
        elif status == 'inactive':
            query = query.filter(Teacher.is_active == False)
        
        # Paginate results
        teachers = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        return jsonify({
            'teachers': [teacher.to_dict(include_sensitive=True) for teacher in teachers.items],
            'total': teachers.total,
            'pages': teachers.pages,
            'current_page': page,
            'per_page': per_page
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@teachers_bp.route('/admin/teachers/<int:teacher_id>', methods=['PUT'])
@jwt_required()
def update_teacher_admin():
    """Update teacher (admin only)"""
    try:
        # TODO: Add admin role verification
        
        teacher = Teacher.query.get(teacher_id)
        if not teacher:
            return jsonify({'error': 'Teacher not found'}), 404
        
        data = request.get_json()
        
        # Admin can update any field
        updatable_fields = [
            'first_name', 'last_name', 'phone', 'whatsapp_number', 
            'country', 'city', 'title', 'bio', 'experience_years', 
            'hourly_rate', 'response_time', 'profile_image_url',
            'admin_notes', 'is_approved', 'is_active', 'can_edit_profile'
        ]
        
        for field in updatable_fields:
            if field in data:
                setattr(teacher, field, data[field])
        
        # Update lists if provided
        if 'subjects_taught' in data:
            teacher.set_subjects_list(data['subjects_taught'])
        if 'education_levels' in data:
            teacher.set_education_levels_list(data['education_levels'])
        if 'languages' in data:
            teacher.set_languages_list(data['languages'])
        if 'specialties' in data:
            teacher.set_specialties_list(data['specialties'])
        if 'education_background' in data:
            teacher.set_education_background(data['education_background'])
        if 'availability_schedule' in data:
            teacher.set_availability_schedule(data['availability_schedule'])
        
        teacher.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Teacher updated successfully',
            'teacher': teacher.to_dict(include_sensitive=True)
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@teachers_bp.route('/admin/teachers/<int:teacher_id>/toggle-edit', methods=['POST'])
@jwt_required()
def toggle_teacher_edit_permission():
    """Toggle teacher's ability to edit their profile (admin only)"""
    try:
        # TODO: Add admin role verification
        
        teacher = Teacher.query.get(teacher_id)
        if not teacher:
            return jsonify({'error': 'Teacher not found'}), 404
        
        teacher.can_edit_profile = not teacher.can_edit_profile
        teacher.updated_at = datetime.utcnow()
        db.session.commit()
        
        status = "enabled" if teacher.can_edit_profile else "disabled"
        
        return jsonify({
            'message': f'Profile editing {status} for teacher {teacher.username}',
            'can_edit_profile': teacher.can_edit_profile
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@teachers_bp.route('/admin/teachers/<int:teacher_id>/approve', methods=['POST'])
@jwt_required()
def approve_teacher():
    """Approve teacher account (admin only)"""
    try:
        # TODO: Add admin role verification
        
        teacher = Teacher.query.get(teacher_id)
        if not teacher:
            return jsonify({'error': 'Teacher not found'}), 404
        
        teacher.is_approved = True
        teacher.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': f'Teacher {teacher.username} approved successfully',
            'teacher': teacher.to_dict(include_sensitive=True)
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@teachers_bp.route('/admin/stats', methods=['GET'])
@jwt_required()
def get_teacher_stats():
    """Get teacher statistics (admin only)"""
    try:
        # TODO: Add admin role verification
        
        total_teachers = Teacher.query.count()
        approved_teachers = Teacher.query.filter_by(is_approved=True).count()
        pending_teachers = Teacher.query.filter_by(is_approved=False).count()
        active_teachers = Teacher.query.filter_by(is_active=True).count()
        inactive_teachers = Teacher.query.filter_by(is_active=False).count()
        
        return jsonify({
            'total_teachers': total_teachers,
            'approved_teachers': approved_teachers,
            'pending_teachers': pending_teachers,
            'active_teachers': active_teachers,
            'inactive_teachers': inactive_teachers
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


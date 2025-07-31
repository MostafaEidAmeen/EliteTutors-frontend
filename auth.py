from flask import Blueprint, request, jsonify, current_app
from src.models.manager import db, Manager, Session
from datetime import datetime, timedelta
import jwt
from functools import wraps

auth_bp = Blueprint('auth', __name__)

def token_required(f):
    """Decorator to require valid token for protected routes"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        # Check for token in Authorization header
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            try:
                token = auth_header.split(" ")[1]  # Bearer <token>
            except IndexError:
                return jsonify({'message': 'Invalid token format'}), 401
        
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        
        try:
            # Decode the token
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            current_manager_id = data['manager_id']
            
            # Check if session exists and is valid
            session = Session.query.filter_by(
                manager_id=current_manager_id,
                session_token=token
            ).first()
            
            if not session or session.expires_at < datetime.utcnow():
                return jsonify({'message': 'Token is invalid or expired'}), 401
            
            # Get the manager
            current_manager = Manager.query.get(current_manager_id)
            if not current_manager or not current_manager.is_active:
                return jsonify({'message': 'Manager not found or inactive'}), 401
            
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token is invalid'}), 401
        except Exception as e:
            return jsonify({'message': 'Token validation failed'}), 401
        
        return f(current_manager, *args, **kwargs)
    
    return decorated

@auth_bp.route('/login', methods=['POST'])
def login():
    """Manager login endpoint"""
    try:
        data = request.get_json()
        
        if not data or not data.get('username') or not data.get('password'):
            return jsonify({'message': 'Username and password are required'}), 400
        
        username = data.get('username')
        password = data.get('password')
        
        # Find manager by username or email
        manager = Manager.query.filter(
            (Manager.username == username) | (Manager.email == username)
        ).first()
        
        if not manager or not manager.check_password(password):
            return jsonify({'message': 'Invalid credentials'}), 401
        
        if not manager.is_active:
            return jsonify({'message': 'Account is deactivated'}), 401
        
        # Generate JWT token
        token_payload = {
            'manager_id': manager.id,
            'username': manager.username,
            'exp': datetime.utcnow() + timedelta(hours=24)  # Token expires in 24 hours
        }
        
        token = jwt.encode(token_payload, current_app.config['SECRET_KEY'], algorithm='HS256')
        
        # Create session record
        session = Session(
            manager_id=manager.id,
            session_token=token,
            expires_at=datetime.utcnow() + timedelta(hours=24)
        )
        
        db.session.add(session)
        db.session.commit()
        
        return jsonify({
            'message': 'Login successful',
            'token': token,
            'manager': manager.to_dict_safe(),
            'expires_at': session.expires_at.isoformat()
        }), 200
        
    except Exception as e:
        return jsonify({'message': 'Login failed', 'error': str(e)}), 500

@auth_bp.route('/logout', methods=['POST'])
@token_required
def logout(current_manager):
    """Manager logout endpoint"""
    try:
        # Get token from header
        token = request.headers.get('Authorization').split(" ")[1]
        
        # Find and delete the session
        session = Session.query.filter_by(
            manager_id=current_manager.id,
            session_token=token
        ).first()
        
        if session:
            db.session.delete(session)
            db.session.commit()
        
        return jsonify({'message': 'Logout successful'}), 200
        
    except Exception as e:
        return jsonify({'message': 'Logout failed', 'error': str(e)}), 500

@auth_bp.route('/verify', methods=['GET'])
@token_required
def verify_token(current_manager):
    """Verify if token is still valid"""
    try:
        return jsonify({
            'message': 'Token is valid',
            'manager': current_manager.to_dict_safe()
        }), 200
        
    except Exception as e:
        return jsonify({'message': 'Token verification failed', 'error': str(e)}), 500

@auth_bp.route('/refresh', methods=['POST'])
@token_required
def refresh_token(current_manager):
    """Refresh the authentication token"""
    try:
        # Get current token
        old_token = request.headers.get('Authorization').split(" ")[1]
        
        # Generate new token
        token_payload = {
            'manager_id': current_manager.id,
            'username': current_manager.username,
            'exp': datetime.utcnow() + timedelta(hours=24)
        }
        
        new_token = jwt.encode(token_payload, current_app.config['SECRET_KEY'], algorithm='HS256')
        
        # Update session with new token
        session = Session.query.filter_by(
            manager_id=current_manager.id,
            session_token=old_token
        ).first()
        
        if session:
            session.session_token = new_token
            session.expires_at = datetime.utcnow() + timedelta(hours=24)
            db.session.commit()
        
        return jsonify({
            'message': 'Token refreshed successfully',
            'token': new_token,
            'expires_at': session.expires_at.isoformat()
        }), 200
        
    except Exception as e:
        return jsonify({'message': 'Token refresh failed', 'error': str(e)}), 500

@auth_bp.route('/profile', methods=['GET'])
@token_required
def get_profile(current_manager):
    """Get current manager's profile"""
    try:
        return jsonify({
            'manager': current_manager.to_dict_safe()
        }), 200
        
    except Exception as e:
        return jsonify({'message': 'Failed to get profile', 'error': str(e)}), 500

@auth_bp.route('/profile', methods=['PUT'])
@token_required
def update_profile(current_manager):
    """Update current manager's profile"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'message': 'No data provided'}), 400
        
        # Update allowed fields
        allowed_fields = ['first_name', 'last_name', 'email', 'phone', 'department']
        
        for field in allowed_fields:
            if field in data:
                setattr(current_manager, field, data[field])
        
        current_manager.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Profile updated successfully',
            'manager': current_manager.to_dict_safe()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to update profile', 'error': str(e)}), 500


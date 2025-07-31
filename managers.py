from flask import Blueprint, request, jsonify
from src.models.manager import db, Manager
from src.routes.auth import token_required
from datetime import datetime, timedelta
from sqlalchemy import or_

managers_bp = Blueprint('managers', __name__)

@managers_bp.route('/managers', methods=['GET'])
@token_required
def get_managers(current_manager):
    """Get list of all managers with optional filtering"""
    try:
        # Get query parameters
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        search = request.args.get('search', '')
        role = request.args.get('role', '')
        is_active = request.args.get('is_active', '')
        
        # Build query
        query = Manager.query
        
        # Apply search filter
        if search:
            query = query.filter(
                or_(
                    Manager.username.contains(search),
                    Manager.email.contains(search),
                    Manager.first_name.contains(search),
                    Manager.last_name.contains(search),
                    Manager.department.contains(search)
                )
            )
        
        # Apply role filter
        if role:
            query = query.filter(Manager.role == role)
        
        # Apply active status filter
        if is_active:
            active_status = is_active.lower() == 'true'
            query = query.filter(Manager.is_active == active_status)
        
        # Order by creation date (newest first)
        query = query.order_by(Manager.created_at.desc())
        
        # Paginate results
        managers = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        return jsonify({
            'managers': [manager.to_dict_safe() for manager in managers.items],
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': managers.total,
                'pages': managers.pages,
                'has_next': managers.has_next,
                'has_prev': managers.has_prev
            }
        }), 200
        
    except Exception as e:
        return jsonify({'message': 'Failed to get managers', 'error': str(e)}), 500

@managers_bp.route('/managers/<int:manager_id>', methods=['GET'])
@token_required
def get_manager(current_manager, manager_id):
    """Get specific manager by ID"""
    try:
        manager = Manager.query.get(manager_id)
        
        if not manager:
            return jsonify({'message': 'Manager not found'}), 404
        
        return jsonify({
            'manager': manager.to_dict_safe()
        }), 200
        
    except Exception as e:
        return jsonify({'message': 'Failed to get manager', 'error': str(e)}), 500

@managers_bp.route('/managers', methods=['POST'])
@token_required
def create_manager(current_manager):
    """Create a new manager"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'message': 'No data provided'}), 400
        
        # Validate required fields
        required_fields = ['username', 'email', 'password', 'first_name', 'last_name']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'message': f'{field} is required'}), 400
        
        # Check if username or email already exists
        existing_manager = Manager.query.filter(
            or_(
                Manager.username == data['username'],
                Manager.email == data['email']
            )
        ).first()
        
        if existing_manager:
            return jsonify({'message': 'Username or email already exists'}), 409
        
        # Create new manager
        manager = Manager(
            username=data['username'],
            email=data['email'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            role=data.get('role', 'manager'),
            phone=data.get('phone'),
            department=data.get('department'),
            is_active=data.get('is_active', True)
        )
        
        # Set password
        manager.set_password(data['password'])
        
        db.session.add(manager)
        db.session.commit()
        
        return jsonify({
            'message': 'Manager created successfully',
            'manager': manager.to_dict_safe()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to create manager', 'error': str(e)}), 500

@managers_bp.route('/managers/<int:manager_id>', methods=['PUT'])
@token_required
def update_manager(current_manager, manager_id):
    """Update an existing manager"""
    try:
        manager = Manager.query.get(manager_id)
        
        if not manager:
            return jsonify({'message': 'Manager not found'}), 404
        
        data = request.get_json()
        
        if not data:
            return jsonify({'message': 'No data provided'}), 400
        
        # Check for username/email conflicts (excluding current manager)
        if 'username' in data or 'email' in data:
            conflict_query = Manager.query.filter(Manager.id != manager_id)
            
            if 'username' in data:
                conflict_query = conflict_query.filter(Manager.username == data['username'])
            
            if 'email' in data:
                conflict_query = conflict_query.filter(Manager.email == data['email'])
            
            if conflict_query.first():
                return jsonify({'message': 'Username or email already exists'}), 409
        
        # Update allowed fields
        allowed_fields = ['username', 'email', 'first_name', 'last_name', 'role', 'phone', 'department', 'is_active']
        
        for field in allowed_fields:
            if field in data:
                setattr(manager, field, data[field])
        
        # Update password if provided
        if 'password' in data and data['password']:
            manager.set_password(data['password'])
        
        manager.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Manager updated successfully',
            'manager': manager.to_dict_safe()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to update manager', 'error': str(e)}), 500

@managers_bp.route('/managers/<int:manager_id>', methods=['DELETE'])
@token_required
def delete_manager(current_manager, manager_id):
    """Delete a manager (soft delete by setting is_active to False)"""
    try:
        manager = Manager.query.get(manager_id)
        
        if not manager:
            return jsonify({'message': 'Manager not found'}), 404
        
        # Prevent self-deletion
        if manager.id == current_manager.id:
            return jsonify({'message': 'Cannot delete your own account'}), 400
        
        # Soft delete by setting is_active to False
        manager.is_active = False
        manager.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Manager deleted successfully'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to delete manager', 'error': str(e)}), 500

@managers_bp.route('/managers/<int:manager_id>/activate', methods=['POST'])
@token_required
def activate_manager(current_manager, manager_id):
    """Activate a deactivated manager"""
    try:
        manager = Manager.query.get(manager_id)
        
        if not manager:
            return jsonify({'message': 'Manager not found'}), 404
        
        manager.is_active = True
        manager.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Manager activated successfully',
            'manager': manager.to_dict_safe()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to activate manager', 'error': str(e)}), 500

@managers_bp.route('/managers/stats', methods=['GET'])
@token_required
def get_manager_stats(current_manager):
    """Get manager statistics"""
    try:
        total_managers = Manager.query.count()
        active_managers = Manager.query.filter(Manager.is_active == True).count()
        inactive_managers = Manager.query.filter(Manager.is_active == False).count()
        
        # Get managers by role
        roles = db.session.query(Manager.role, db.func.count(Manager.id)).group_by(Manager.role).all()
        role_stats = {role: count for role, count in roles}
        
        # Get recent managers (last 30 days)
        thirty_days_ago = datetime.utcnow() - timedelta(days=30)
        recent_managers = Manager.query.filter(Manager.created_at >= thirty_days_ago).count()
        
        return jsonify({
            'total_managers': total_managers,
            'active_managers': active_managers,
            'inactive_managers': inactive_managers,
            'role_stats': role_stats,
            'recent_managers': recent_managers
        }), 200
        
    except Exception as e:
        return jsonify({'message': 'Failed to get manager stats', 'error': str(e)}), 500


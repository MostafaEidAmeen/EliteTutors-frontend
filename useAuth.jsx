import { createContext, useContext, useState, useEffect } from 'react';
import { teacherAPI } from '../lib/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      if (teacherAPI.isAuthenticated()) {
        const response = await teacherAPI.getProfile();
        setTeacher(response.teacher);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      teacherAPI.logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      setError(null);
      setLoading(true);
      const response = await teacherAPI.login(username, password);
      setTeacher(response.teacher);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (teacherData) => {
    try {
      setError(null);
      setLoading(true);
      const response = await teacherAPI.register(teacherData);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    teacherAPI.logout();
    setTeacher(null);
  };

  const updateProfile = async (profileData) => {
    try {
      setError(null);
      const response = await teacherAPI.updateProfile(profileData);
      setTeacher(response.teacher);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const value = {
    teacher,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!teacher,
    canEditProfile: teacher?.can_edit_profile ?? false
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


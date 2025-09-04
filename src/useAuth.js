import { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '../lib/api.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('admin_token');
      
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await apiClient.verifyToken();
      setUser(response.manager);
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('admin_token');
      apiClient.setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await apiClient.login(credentials);
      setUser(response.manager);
      
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('admin_token');
      apiClient.setToken(null);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await apiClient.updateProfile(profileData);
      setUser(response.manager);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


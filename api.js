// API configuration and utility functions
const API_BASE_URL = 'https://8xhpiqcl9jqx.manus.space/api/admin';

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('admin_token');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('admin_token', token);
    } else {
      localStorage.removeItem('admin_token');
    }
  }

  getAuthHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: this.getAuthHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Authentication methods
  async login(credentials) {
    const response = await this.request('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async logout() {
    try {
      await this.request('/logout', {
        method: 'POST',
      });
    } finally {
      this.setToken(null);
    }
  }

  async verifyToken() {
    return await this.request('/verify');
  }

  async refreshToken() {
    const response = await this.request('/refresh', {
      method: 'POST',
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async getProfile() {
    return await this.request('/profile');
  }

  async updateProfile(profileData) {
    return await this.request('/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Manager management methods
  async getManagers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/managers?${queryString}` : '/managers';
    return await this.request(endpoint);
  }

  async getManager(id) {
    return await this.request(`/managers/${id}`);
  }

  async createManager(managerData) {
    return await this.request('/managers', {
      method: 'POST',
      body: JSON.stringify(managerData),
    });
  }

  async updateManager(id, managerData) {
    return await this.request(`/managers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(managerData),
    });
  }

  async deleteManager(id) {
    return await this.request(`/managers/${id}`, {
      method: 'DELETE',
    });
  }

  async activateManager(id) {
    return await this.request(`/managers/${id}/activate`, {
      method: 'POST',
    });
  }

  async getManagerStats() {
    return await this.request('/managers/stats');
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient();

// Export individual methods for convenience
export const {
  login,
  logout,
  verifyToken,
  refreshToken,
  getProfile,
  updateProfile,
  getManagers,
  getManager,
  createManager,
  updateManager,
  deleteManager,
  activateManager,
  getManagerStats,
} = apiClient;


import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refresh_token: refreshToken
          });
          
          const { access_token } = response.data;
          localStorage.setItem('access_token', access_token);
          
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// ============================================
// AUTH ENDPOINTS
// ============================================
export const authService = {
  login: (email, password) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    return api.post('/auth/login', formData);
  },
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
  updateProfile: (userData) => api.put('/auth/me', userData),
  logout: () => api.post('/auth/logout'),
};

// ============================================
// GENERATOR ENDPOINTS
// ============================================
export const generatorService = {
  generateDescription: (data) => api.post('/generator/generate', data),
  generateBatch: (products) => api.post('/generator/generate-batch', products),
  getTemplates: () => api.get('/generator/templates'),
  getTones: () => api.get('/generator/tones'),
  getHistory: () => api.get('/generator/history'),
  saveDescription: (data) => api.post('/generator/save', data),
  deleteDescription: (id) => api.delete(`/generator/${id}`),
};

// ============================================
// PRODUCTS ENDPOINTS
// ============================================
export const productsService = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  saveDescription: (data) => api.post('/products/descriptions', data),
  getDescriptions: (productId) => api.get(`/products/${productId}/descriptions`),
};

// ============================================
// SUBSCRIPTION ENDPOINTS
// ============================================
export const subscriptionService = {
  getPlans: () => api.get('/subscription/plans'),
  getCurrent: () => api.get('/subscription/current'),
  createCheckout: (planId) => api.post('/subscription/create-checkout-session', { plan_id: planId }),
  cancel: () => api.post('/subscription/cancel'),
  resume: () => api.post('/subscription/resume'),
  getBillingHistory: () => api.get('/subscription/billing'),
};

// ============================================
// TEAM ENDPOINTS
// ============================================
export const teamService = {
  getMyTeams: () => api.get('/team/my-teams'),
  getTeam: (teamId) => api.get(`/team/${teamId}`),
  createTeam: (data) => api.post('/team/create', data),
  inviteMember: (teamId, data) => api.post(`/team/${teamId}/invite`, data),
  acceptInvitation: (token) => api.post(`/team/accept-invitation/${token}`),
  updateMemberRole: (teamId, userId, role) => 
    api.put(`/team/${teamId}/members/${userId}/role`, { new_role: role }),
  removeMember: (teamId, userId) => 
    api.delete(`/team/${teamId}/members/${userId}`),
};

// ============================================
// ANALYTICS ENDPOINTS
// ============================================
export const analyticsService = {
  getDashboardStats: (timeRange = '30d') => 
    api.get(`/analytics/dashboard?time_range=${timeRange}`),
  trackEvent: (data) => api.post('/analytics/track', data),
  getUserStats: () => api.get('/analytics/user-stats'),
  getTeamStats: (teamId) => api.get(`/analytics/team/${teamId}`),
  getGenerationStats: () => api.get('/analytics/generations'),
};

// ============================================
// SHOPIFY ENDPOINTS
// ============================================
export const shopifyService = {
  connectStore: (shopUrl) => api.post('/shopify/connect', { shop_url: shopUrl }),
  fetchProducts: () => api.get('/shopify/products'),
  syncProducts: (productIds) => api.post('/shopify/sync', { product_ids: productIds }),
  updateDescription: (productId, description) => 
    api.put(`/shopify/products/${productId}/description`, { description }),
  disconnectStore: () => api.delete('/shopify/disconnect'),
};

// ============================================
// MOCK API FOR DEVELOPMENT (No Backend Needed)
// ============================================
export const mockApi = {
  generateDescription: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const templates = {
      professional: `Introducing the ${data.product_name} - a premium quality product designed to exceed your expectations. This exceptional ${data.category || 'product'} combines cutting-edge technology with elegant design, delivering unparalleled performance and reliability. Perfect for professionals and enthusiasts alike.`,
      
      casual: `Hey there! Check out this awesome ${data.product_name}! It's super cool and perfect for your daily needs. Whether you're a beginner or a pro, this ${data.category || 'product'} will make your life so much easier. Get yours today!`,
      
      luxury: `Presenting the exquisite ${data.product_name} - a masterpiece of luxury and sophistication. Meticulously crafted with premium materials, this exceptional ${data.category || 'product'} embodies elegance and exclusivity.`,
      
      funny: `Warning: The ${data.product_name} may cause extreme happiness! This ${data.category || 'product'} is so good, your friends will be jealous. Don't blame us if you become the most popular person in your friend group! 😂`,
      
      emotional: `The ${data.product_name} is more than just a ${data.category || 'product'} - it's a companion that understands your needs. Every detail has been thoughtfully designed with love and care, because we believe you deserve the best. ❤️`
    };

    return { data: { description: templates[data.tone] || templates.professional } };
  },
};

// ============================================
// MAIN EXPORT - For Components
// ============================================

// Export individual functions for direct use
export const generateDescription = async (data) => {
  // Use mock API if no backend is available
  if (process.env.REACT_APP_USE_MOCK === 'true' || !process.env.REACT_APP_API_URL) {
    const response = await mockApi.generateDescription(data);
    return response.data;
  }
  
  // Use real API when backend is ready
  const response = await generatorService.generateDescription(data);
  return response.data;
};

// Export all services as default
const apiService = {
  auth: authService,
  generator: generatorService,
  products: productsService,
  subscription: subscriptionService,
  team: teamService,
  analytics: analyticsService,
  shopify: shopifyService,
  mock: mockApi,
  generateDescription,
};

export default apiService;
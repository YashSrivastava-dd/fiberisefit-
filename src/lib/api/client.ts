const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Get the current auth token from localStorage
 */
function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}

/**
 * Make an authenticated API request
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle 401 Unauthorized - token expired or invalid
  if (response.status === 401) {
    // Remove invalid token
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    
    // Redirect to login if not already on login page
    if (!window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
    
    throw new Error('Authentication required');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `API error: ${response.status}`);
  }

  return await response.json();
}

/**
 * Auth API functions
 */
export const authAPI = {
  sendOTP: async (phoneNumber: string) => {
    return apiRequest<{ success: boolean; message: string; otp?: string }>(
      '/api/auth/send-otp',
      {
        method: 'POST',
        body: JSON.stringify({ phoneNumber }),
      }
    );
  },

  verifyOTP: async (phoneNumber: string, otp: string) => {
    return apiRequest<{
      success: boolean;
      token: string;
      user: {
        userId: string;
        phone: string;
        createdAt: any;
        lastLogin: any;
      };
    }>('/api/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phoneNumber, otp }),
    });
  },

  verifyFirebaseToken: async (idToken: string) => {
    return apiRequest<{
      success: boolean;
      token: string;
      user: {
        userId: string;
        phone: string;
        createdAt: any;
        lastLogin: any;
      };
    }>('/api/auth/verify-firebase-token', {
      method: 'POST',
      body: JSON.stringify({ idToken }),
    });
  },

  refreshToken: async () => {
    return apiRequest<{ success: boolean; token: string }>('/api/auth/refresh', {
      method: 'POST',
    });
  },

  getMe: async () => {
    return apiRequest<{
      success: boolean;
      user: {
        userId: string;
        phone: string;
        createdAt: any;
        updatedAt: any;
        lastLogin: any;
      };
    }>('/api/auth/me', {
      method: 'GET',
    });
  },

  logout: async () => {
    try {
      await apiRequest('/api/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      // Ignore errors on logout
    }
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },
};


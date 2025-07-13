import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

const API_BASE_URL = 'http://localhost:3000';

// User state store
const createUserStore = () => {
  const storedUser = browser ? localStorage.getItem('meowtime_user') : null;
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const { subscribe, set, update } = writable(initialUser);

  return {
    subscribe,
    /** @param {any} user */
    set: (user) => {
      if (browser) {
        if (user) {
          localStorage.setItem('meowtime_user', JSON.stringify(user));
        } else {
          localStorage.removeItem('meowtime_user');
        }
      }
      set(user);
    },
    update,
    clear: () => {
      if (browser) {
        localStorage.removeItem('meowtime_user');
      }
      set(null);
    }
  };
};

const createAuthStore = () => {
  const initialAuth = browser && localStorage.getItem('meowtime_auth_token')
    ? { token: localStorage.getItem('meowtime_auth_token'), isAuthenticated: true }
    : { token: null, isAuthenticated: false };

  const { subscribe, set, update } = writable(initialAuth);

  return {
    subscribe,
    /** @param {string | null} token */
    setToken: (token) => {
      if (browser) {
        if (token) {
          localStorage.setItem('meowtime_auth_token', token);
        } else {
          localStorage.removeItem('meowtime_auth_token');
        }
      }
      set({ token, isAuthenticated: !!token });
    },
    clear: () => {
      if (browser) {
        localStorage.removeItem('meowtime_auth_token');
      }
      set({ token: null, isAuthenticated: false });
    }
  };
};

// Loading state store
const loading = writable(false);

// Error state store
const error = writable(/** @type {string | null} */ (null));

// Create store instances
export const user = createUserStore();
export const auth = createAuthStore();
export { loading, error };

// Derived store for checking if user is logged in
export const isLoggedIn = derived(
  [user, auth],
  ([$user, $auth]) => !!$user && $auth.isAuthenticated
);

/**
 * @param {string} endpoint 
 * @param {any} [options]
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  };

  const authState = browser && localStorage.getItem('meowtime_auth_token');

  if (authState) {
    defaultOptions.headers.Authorization = `Bearer ${authState}`;
  }

  try {
    loading.set(true);
    error.set(null);

    const response = await fetch(url, defaultOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    const authHeader = response.headers.get('Authorization');
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      auth.setToken(token);
    }

    return data;    
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      error.set(errorMessage);
      throw err;
  } finally {
    loading.set(false);
  }
};

// API Functions
export const api = {
  /**
   * Handle Slack OAuth callback
   * @param {string} code - Authorization code from Slack
   * @returns {Promise<Object>} User data
   */
  slackCallback: async (code) => {
    try {
      const data = await apiRequest(`/auth-service/slack/callback?code=${encodeURIComponent(code)}`, {
        method: 'GET',
      });

      // Store user data and auth token if provided
      if (data.id) {
        const userData = {
          id: data.id,
          name: data.name,
          email: data.email,
          picture: data.picture,
          teamId: data.team_id,
          teamName: data.team_name,
        };
        
        user.set(userData);
        
        // The token is on the Authorization header as Bearer + token
        // Store the token in auth store
    

        // If there's a token in the response, store it
        if (data.token) {
          auth.setToken(data.token);
        }
      }

      return data;
    } catch (err) {
      console.error('Slack callback failed:', err);
      throw err;
    }
  },

  /**
   * Logout user
   * @returns {Promise<void>}
   */
  logout: async () => {
    try {
      await apiRequest('/auth-service/logout', {
        method: 'POST',
      });
    } catch (err) {
      console.error('Logout API call failed:', err);
    } finally {
      user.clear();
      auth.clear();
      error.set(null);
    }
  },

  /**
   * Get current user profile
   * @returns {Promise<Object>} User data
   */
  getProfile: async () => {
    try {      
      const storedUser = browser ? localStorage.getItem('meowtime_user') : null
    
      if (storedUser) {
        return JSON.parse(storedUser);
      }

      return user
    } catch (err) {
      console.error(err || 'Failed to fetch profile');
      throw err;
    }
  },

  /**
   * Check if current session is valid
   * @returns {Promise<boolean>} Session validity
   */
  validateSession: async () => {
    try {
      await apiRequest('/validate', {
        method: 'GET',
      });
      return true;
    } catch (err) {
      console.error('Session validation failed:', err);
      auth.clear();
      user.clear();
      return false;
    }
  },
};

// Helper functions
export const helpers = {
  /**
   * Initialize the auth state on app start
   */
  init: async () => {
    if (!browser) return;
    
    const token = localStorage.getItem('meowtime_auth_token');
    if (token) {
      try {
        // Validate existing session
        const isValid = await api.validateSession();
        if (isValid) {
          // Try to get current user profile
          await api.getProfile();
        }
      } catch (err) {
        console.error('Auth initialization failed:', err);
        // Clear invalid auth state
        auth.clear();
        user.clear();
      }
    }
  },

  /**
   * Clear all stored data
   */
  clearAll: () => {
    user.clear();
    auth.clear();
    error.set(null);
  },
};

// Auto-initialize when imported
if (browser) {
  helpers.init();
}
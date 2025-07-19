import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

const API_BASE_URL = 'http://localhost:3000';

const createUserStore = () => {
  const storedUser = browser ? localStorage.getItem('meowtime_user') : null;
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const { subscribe, set, update } = writable(initialUser);

  return {
    subscribe,
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

const loading = writable(false);
const error = writable(null);

export const user = createUserStore();
export const auth = createAuthStore();
export { loading, error };

export const isLoggedIn = derived(
  [user, auth],
  ([$user, $auth]) => !!$user && $auth.isAuthenticated
);

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
    defaultOptions.headers.Authorization = authState;
  }

  try {
    loading.set(true);
    error.set(null);

    const response = await fetch(url, defaultOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
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

export const api = {
  slackCallback: async (code) => {
    try {
      const data = await apiRequest(`/auth-service/slack/callback?code=${encodeURIComponent(code)}`, {
        method: 'GET',
      });

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
      }

      if (data.token) {
        auth.setToken(data.token);
      }

      return data;
    } catch (err) {
      console.error('Slack callback failed:', err);
      throw err;
    }
  },

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

  getProfile: async () => {
    try {      
      const authToken = browser ? localStorage.getItem('meowtime_auth_token') : null;
      const storedUser = browser ? localStorage.getItem('meowtime_user') : null;
    
      if (!authToken) {
        user.clear();
        auth.clear();
        throw new Error('User is not authenticated');
      }

      auth.setToken(authToken);

      if (storedUser) {
        const userData = JSON.parse(storedUser);
        user.set(userData);
        return userData;
      }

      const data = await apiRequest('/auth-service/profile', {
        method: 'GET',
      });

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
        return userData;
      }

      throw new Error('Invalid profile data');
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      user.clear();
      auth.clear();
      throw err;
    }
  },

  validateSession: async () => {
    // get hte profile to validate the session
    try {
      const profile = await api.getProfile();
      if (profile && profile.id) {
        return true;
      }
      return false;
    }
    catch (err) {
      console.error('Session validation failed:', err);
      user.clear();
      auth.clear();
      return false;
    }
  },

  /**
   * Get user's projects
   * @returns {Promise<any[]>} List of user projects
   */
  getMyProjects: async () => {
    try {
      const data = await apiRequest('/project-service/my/projects', {
        method: 'GET',
      });

      return data;
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      throw err;
    }
  },
};

export const helpers = {
  init: async () => {
    if (!browser) return;
    
    const token = localStorage.getItem('meowtime_auth_token');
    const storedUser = localStorage.getItem('meowtime_user');
    
    if (token) {
      try {
        auth.setToken(token);
        
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          user.set(userData);
        }
        
        const isValid = await api.validateSession();

        if (!isValid) {
          auth.clear();
          user.clear();
        }
      } catch (err) {
        console.error('Auth initialization failed:', err);
        auth.clear();
        user.clear();
      }
    }
  },

  clearAll: () => {
    user.clear();
    auth.clear();
    error.set(null);
  },
};

if (browser) {
  helpers.init();
}
<<<<<<< HEAD
import { supabase } from '../lib/supabase';
=======
<<<<<<< HEAD
import { supabase } from '../lib/supabase';
=======
import api from '../lib/api';
>>>>>>> 543604f79ee2629fb590a13389ced1f0a9de7d10
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      fullName: string;
      email: string;
      role: string;
      avatar?: string;
      purchasedProjects: string[];
      orders: string[];
      clientRequests: string[];
      createdAt: string;
    };
    token: string;
  };
}

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (error) {
        return {
          success: false,
          message: error.message,
          data: { user: null, token: '' }
        };
      }

<<<<<<< HEAD
      if (!authData.user) {
        return {
          success: false,
          message: 'Login failed: No user returned',
          data: { user: null, token: '' }
        };
      }

      // Get user profile from profiles table with error handling
      let profile = null;
      try {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authData.user.id)
          .single();

        if (profileError) {
          console.warn('Profile fetch error:', profileError);
          // Don't fail login if profile fetch fails, use defaults
        } else {
          profile = profileData;
        }
      } catch (profileError) {
        console.warn('Profile fetch exception:', profileError);
=======
      // Get user profile from profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
      }

      const user = {
        id: authData.user.id,
        fullName: profile?.full_name || authData.user.email?.split('@')[0] || 'User',
        email: authData.user.email!,
        role: profile?.role || 'user',
        avatar: profile?.avatar || '',
        purchasedProjects: profile?.purchased_projects || [],
        orders: profile?.orders || [],
        clientRequests: profile?.client_requests || [],
<<<<<<< HEAD
        createdAt: authData.user.created_at || new Date().toISOString()
=======
        createdAt: authData.user.created_at
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
      };

      return {
        success: true,
        message: 'Login successful',
        data: { user, token: authData.session?.access_token || '' }
      };
    } catch (error) {
<<<<<<< HEAD
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Login failed due to an unexpected error',
=======
      return {
        success: false,
        message: 'Login failed',
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
        data: { user: null, token: '' }
      };
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName
          }
        }
      });

      if (error) {
        return {
          success: false,
          message: error.message,
          data: { user: null, token: '' }
        };
      }

      if (!authData.user) {
        return {
          success: false,
<<<<<<< HEAD
          message: 'Registration failed: No user created',
=======
          message: 'Registration failed',
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
          data: { user: null, token: '' }
        };
      }

<<<<<<< HEAD
      // Create profile record with error handling
      try {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            full_name: data.fullName,
            email: data.email,
            role: 'user'
          });

        if (profileError) {
          console.warn('Profile creation error:', profileError);
          // Don't fail registration if profile creation fails
        }
      } catch (profileError) {
        console.warn('Profile creation exception:', profileError);
=======
      // Create profile record
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          full_name: data.fullName,
          email: data.email,
          role: 'user'
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
      }

      const user = {
        id: authData.user.id,
        fullName: data.fullName,
        email: data.email,
        role: 'user',
        avatar: '',
        purchasedProjects: [],
        orders: [],
        clientRequests: [],
<<<<<<< HEAD
        createdAt: authData.user.created_at || new Date().toISOString()
=======
        createdAt: authData.user.created_at
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
      };

      return {
        success: true,
        message: 'Registration successful',
        data: { user, token: authData.session?.access_token || '' }
      };
    } catch (error) {
<<<<<<< HEAD
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'Registration failed due to an unexpected error',
=======
      return {
        success: false,
        message: 'Registration failed',
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
        data: { user: null, token: '' }
      };
    }
  },

  async getProfile() {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        return {
          success: false,
          message: 'Not authenticated',
          data: { user: null }
        };
      }

<<<<<<< HEAD
      // Get profile with error handling
      let profile = null;
      try {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.warn('Profile fetch error:', profileError);
        } else {
          profile = profileData;
        }
      } catch (profileError) {
        console.warn('Profile fetch exception:', profileError);
=======
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
      }

      const userData = {
        id: user.id,
        fullName: profile?.full_name || user.email?.split('@')[0] || 'User',
        email: user.email!,
        role: profile?.role || 'user',
        avatar: profile?.avatar || '',
        purchasedProjects: profile?.purchased_projects || [],
        orders: profile?.orders || [],
        clientRequests: profile?.client_requests || [],
<<<<<<< HEAD
        createdAt: user.created_at || new Date().toISOString()
=======
        createdAt: user.created_at
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
      };

      return {
        success: true,
        message: 'Profile fetched successfully',
        data: { user: userData }
      };
    } catch (error) {
<<<<<<< HEAD
      console.error('Get profile error:', error);
=======
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
      return {
        success: false,
        message: 'Failed to fetch profile',
        data: { user: null }
      };
    }
  },

  async updateProfile(data: { fullName?: string; avatar?: string }) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return {
          success: false,
          message: 'Not authenticated'
        };
      }

      const updateData: any = {};
      if (data.fullName) updateData.full_name = data.fullName;
      if (data.avatar) updateData.avatar = data.avatar;

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id);

      if (error) {
        return {
          success: false,
          message: error.message
        };
      }

      return {
        success: true,
        message: 'Profile updated successfully'
      };
    } catch (error) {
<<<<<<< HEAD
      console.error('Update profile error:', error);
=======
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
      return {
        success: false,
        message: 'Failed to update profile'
      };
    }
  },

  async changePassword(data: { currentPassword: string; newPassword: string }) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword
      });

      if (error) {
        return {
          success: false,
          message: error.message
        };
      }

      return {
        success: true,
        message: 'Password updated successfully'
      };
    } catch (error) {
<<<<<<< HEAD
      console.error('Change password error:', error);
=======
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
      return {
        success: false,
        message: 'Failed to update password'
      };
    }
  },

  async logout() {
    try {
      await supabase.auth.signOut();
<<<<<<< HEAD
      // Clear local storage safely
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('supabase.auth.token');
      }
=======
      localStorage.removeItem('user');
      window.location.href = '/login';
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  getToken() {
<<<<<<< HEAD
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('supabase.auth.token') || 
           localStorage.getItem('sb-access-token');
  },

  setToken(token: string) {
    if (typeof window === 'undefined') return;
    localStorage.setItem('supabase.auth.token', token);
  },

  getUser() {
    if (typeof window === 'undefined') return null;
=======
    return localStorage.getItem('supabase.auth.token');
  },

  setToken(token: string) {
    localStorage.setItem('supabase.auth.token', token);
=======
    const response = await api.post('/auth/signin', data);
    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post('/auth/signup', data);
    return response.data;
  },

  async getProfile() {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  async updateProfile(data: { fullName?: string; avatar?: string }) {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },

  async changePassword(data: { currentPassword: string; newPassword: string }) {
    const response = await api.put('/auth/change-password', data);
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  getToken() {
    return localStorage.getItem('token');
  },

  setToken(token: string) {
    localStorage.setItem('token', token);
>>>>>>> 543604f79ee2629fb590a13389ced1f0a9de7d10
  },

  getUser() {
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  setUser(user: any) {
<<<<<<< HEAD
    if (typeof window === 'undefined') return;
    localStorage.setItem('user', JSON.stringify(user));
  },

=======
    localStorage.setItem('user', JSON.stringify(user));
  },

<<<<<<< HEAD
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
  async isAuthenticated(): Promise<boolean> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return !!session;
    } catch (error) {
<<<<<<< HEAD
      console.error('Auth check error:', error);
=======
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
      return false;
    }
  },

  async isAdmin(): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      return profile?.role === 'admin';
    } catch (error) {
<<<<<<< HEAD
      console.error('Admin check error:', error);
      return false;
    }
=======
      return false;
    }
=======
  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === 'admin';
>>>>>>> 543604f79ee2629fb590a13389ced1f0a9de7d10
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
  }
};

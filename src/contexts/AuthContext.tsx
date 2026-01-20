<<<<<<< HEAD
import React, { createContext, useContext } from 'react';

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
=======
import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '@/services/auth.service';
<<<<<<< HEAD
import { supabase } from '@/lib/supabase';
=======
>>>>>>> 543604f79ee2629fb590a13389ced1f0a9de7d10

interface AuthContextType {
  user: any | null;
  isLoading: boolean;
  isAdmin: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
<<<<<<< HEAD
  const mockUser: User = {
    id: 'admin-1',
    fullName: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
  };

  const value: AuthContextType = {
    user: mockUser,
    isLoading: false,
    isAdmin: true,
    signIn: async () => ({ error: null }),
    signUp: async () => ({ error: null }),
    signOut: async () => {},
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
=======
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
<<<<<<< HEAD
    // Initialize auth state
    const initializeAuth = async () => {
      try {
        // Check for existing session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Get user profile
          const profileResponse = await authService.getProfile();
          if (profileResponse.success) {
            setUser(profileResponse.data.user);
            setIsAdmin(profileResponse.data.user.role === 'admin');
            authService.setUser(profileResponse.data.user);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const profileResponse = await authService.getProfile();
          if (profileResponse.success) {
            setUser(profileResponse.data.user);
            setIsAdmin(profileResponse.data.user.role === 'admin');
            authService.setUser(profileResponse.data.user);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsAdmin(false);
          localStorage.removeItem('user');
        }
      }
    );

    return () => subscription.unsubscribe();
=======
    // Check for existing session on mount
    const token = authService.getToken();
    const userData = authService.getUser();
    
    if (token && userData) {
      setUser(userData);
      setIsAdmin(authService.isAdmin());
    }
    
    setIsLoading(false);
>>>>>>> 543604f79ee2629fb590a13389ced1f0a9de7d10
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const response = await authService.register({
        email,
        password,
        fullName
      });

      if (response.success) {
        setUser(response.data.user);
<<<<<<< HEAD
=======
        authService.setToken(response.data.token);
>>>>>>> 543604f79ee2629fb590a13389ced1f0a9de7d10
        authService.setUser(response.data.user);
        setIsAdmin(response.data.user.role === 'admin');
      }

      return { error: response.success ? null : new Error(response.message) };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await authService.login({
        email,
        password
      });

      if (response.success) {
        setUser(response.data.user);
<<<<<<< HEAD
=======
        authService.setToken(response.data.token);
>>>>>>> 543604f79ee2629fb590a13389ced1f0a9de7d10
        authService.setUser(response.data.user);
        setIsAdmin(response.data.user.role === 'admin');
      }

      return { error: response.success ? null : new Error(response.message) };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
<<<<<<< HEAD
    await authService.logout();
=======
    authService.logout();
>>>>>>> 543604f79ee2629fb590a13389ced1f0a9de7d10
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAdmin,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
<<<<<<< HEAD

export default AuthContext;
=======
>>>>>>> 241152972fd255a93c347acfcadaaf09fe8cc3bd

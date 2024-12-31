import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import {
  authService,
  type SignInCredentials,
  type SignUpCredentials,
} from '../services/auth/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (
    credentials: SignInCredentials,
  ) => Promise<{ isSignedIn: boolean; nextStep: any }>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  confirmSignUp: (email: string, code: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      console.log('Checking auth state...');
      const user = await getCurrentUser();
      console.log('Current user:', user);
      setIsAuthenticated(!!user);
    } catch (err) {
      console.log('No authenticated user found:', err);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (credentials: SignInCredentials) => {
    try {
      setError(null);
      const result = await authService.signIn(credentials);
      setIsAuthenticated(result.isSignedIn);
      return result;
    } catch (err) {
      console.error('Sign in error in context:', err);
      setError(err instanceof Error ? err : new Error('Sign in failed'));
      throw err;
    }
  };

  const handleSignUp = async (credentials: SignUpCredentials) => {
    try {
      setError(null);
      await authService.signUp(credentials);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Sign up failed'));
      throw err;
    }
  };

  const handleConfirmSignUp = async (email: string, code: string) => {
    try {
      setError(null);
      return await authService.confirmSignUp(email, code);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Confirmation failed'));
      throw err;
    }
  };

  const handleSignOut = async () => {
    try {
      setError(null);
      await authService.signOut();
      setIsAuthenticated(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Sign out failed'));
      throw err;
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    signIn: handleSignIn,
    signUp: handleSignUp,
    confirmSignUp: handleConfirmSignUp,
    signOut: handleSignOut,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

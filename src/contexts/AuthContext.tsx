import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, type AuthUser } from 'aws-amplify/auth';
import {
  authService,
  type SignInCredentials,
  type SignUpCredentials,
} from '../services/auth/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthUser | null;
  signIn: (
    credentials: SignInCredentials,
  ) => Promise<{ isSignedIn: boolean; nextStep: any }>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  confirmSignUp: (email: string, code: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<any>;
  confirmResetPassword: (
    email: string,
    code: string,
    newPassword: string,
  ) => Promise<void>;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      console.log('Checking auth state...');
      const currentUser = await getCurrentUser();
      console.log('Current user:', currentUser);
      setUser(currentUser);
      setIsAuthenticated(!!currentUser);
    } catch (err) {
      console.log('No authenticated user found:', err);
      setUser(null);
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

  const handleResetPassword = async (email: string) => {
    try {
      setError(null);
      return await authService.resetPassword(email);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Password reset request failed'),
      );
      throw err;
    }
  };

  const handleConfirmResetPassword = async (
    email: string,
    code: string,
    newPassword: string,
  ) => {
    try {
      setError(null);
      await authService.confirmResetPassword(email, code, newPassword);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error('Password reset confirmation failed'),
      );
      throw err;
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    signIn: handleSignIn,
    signUp: handleSignUp,
    confirmSignUp: handleConfirmSignUp,
    signOut: handleSignOut,
    resetPassword: handleResetPassword,
    confirmResetPassword: handleConfirmResetPassword,
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

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [onAuthSuccessCallback, setOnAuthSuccessCallback] = useState<(() => void) | null>(null);

  // Load user from local storage on mount
  useEffect(() => {
    const stored = localStorage.getItem('eric_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse stored user data', e);
      }
    }
  }, []);

  const login = (email: string, name: string, institution?: string) => {
    const newUser: User = { name, email, institution };
    setUser(newUser);
    localStorage.setItem('eric_user', JSON.stringify(newUser));
    setAuthModalOpen(false);

    // If there is an active callback (e.g. clicked register while logged out), fire it!
    if (onAuthSuccessCallback) {
      setTimeout(() => {
        onAuthSuccessCallback();
        setOnAuthSuccessCallback(null);
      }, 300);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eric_user');
    setOnAuthSuccessCallback(null);
  };

  const triggerAuthCallback = (onSuccess: () => void) => {
    if (user) {
      onSuccess();
    } else {
      setOnAuthSuccessCallback(() => onSuccess);
      setAuthModalOpen(true);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthModalOpen,
        setAuthModalOpen,
        triggerAuthCallback,
        onAuthSuccessCallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

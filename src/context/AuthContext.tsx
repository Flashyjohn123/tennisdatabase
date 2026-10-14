import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, UserProfile, isSupabaseConfigured } from '../services/authService';
import { favoritesService } from '../services/favoritesService';

interface AuthContextType {
  user: UserProfile | null;
  isConfigured: boolean;
  signIn: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isConfigured: false,
  signIn: async () => ({ success: false }),
  signUp: async () => ({ success: false }),
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => authService.getCurrentUser());

  useEffect(() => {
    // When user logs in, sync their cloud favorites with favoritesService
    if (user && user.favorites && user.favorites.length > 0) {
      user.favorites.forEach((id) => favoritesService.addFavorite(id));
    }
  }, [user]);

  // Sync favorites changes back to user account
  useEffect(() => {
    return favoritesService.subscribe((favs) => {
      if (user) {
        authService.syncUserFavorites(user.id, favs);
      }
    });
  }, [user]);

  const signIn = async (email: string, pass: string) => {
    const res = await authService.signIn(email, pass);
    if (res.error) {
      return { success: false, error: res.error };
    }
    setUser(res.user);
    return { success: true };
  };

  const signUp = async (email: string, pass: string) => {
    const res = await authService.signUp(email, pass);
    if (res.error) {
      return { success: false, error: res.error };
    }
    setUser(res.user);
    return { success: true };
  };

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isConfigured: isSupabaseConfigured,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

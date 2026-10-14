// Supabase client and sync adapter for Circuit Pro Tennis Database
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL && 
  SUPABASE_ANON_KEY && 
  !SUPABASE_URL.includes('your-project') &&
  !SUPABASE_ANON_KEY.includes('your-anon-key')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

export interface UserProfile {
  id: string;
  email: string;
  favorites: string[];
  createdAt: string;
  isDemoUser?: boolean;
}

const LOCAL_STORAGE_USER_KEY = 'tennisdb_user_session_v1';
const LOCAL_STORAGE_PROFILES_KEY = 'tennisdb_local_user_profiles_v1';

// Demo local profiles database for zero-config offline or local development
function getLocalProfiles(): Record<string, { email: string; favorites: string[]; passwordHash: string }> {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_PROFILES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalProfiles(profiles: Record<string, any>) {
  try {
    localStorage.setItem(LOCAL_STORAGE_PROFILES_KEY, JSON.stringify(profiles));
  } catch (err) {
    console.error('Failed to save local profiles', err);
  }
}

export const authService = {
  getCurrentUser(): UserProfile | null {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  async signUp(email: string, password: string): Promise<{ user: UserProfile | null; error: string | null }> {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      return { user: null, error: 'Email and password are required.' };
    }
    if (password.length < 6) {
      return { user: null, error: 'Password must be at least 6 characters.' };
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
      });
      if (error) {
        return { user: null, error: error.message };
      }
      if (data.user) {
        const profile: UserProfile = {
          id: data.user.id,
          email: cleanEmail,
          favorites: [],
          createdAt: new Date().toISOString(),
          isDemoUser: false,
        };
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(profile));
        return { user: profile, error: null };
      }
    }

    // Local / Offline fallback auth
    const profiles = getLocalProfiles();
    if (profiles[cleanEmail]) {
      return { user: null, error: 'An account with this email already exists.' };
    }

    profiles[cleanEmail] = {
      email: cleanEmail,
      favorites: [],
      passwordHash: btoa(password), // simple local encoding
    };
    saveLocalProfiles(profiles);

    const localProfile: UserProfile = {
      id: 'local_' + Math.random().toString(36).substring(2, 9),
      email: cleanEmail,
      favorites: [],
      createdAt: new Date().toISOString(),
      isDemoUser: true,
    };
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(localProfile));
    return { user: localProfile, error: null };
  },

  async signIn(email: string, password: string): Promise<{ user: UserProfile | null; error: string | null }> {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      return { user: null, error: 'Email and password are required.' };
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });
      if (error) {
        return { user: null, error: error.message };
      }
      if (data.user) {
        // Sync remote preferences
        let userFavs: string[] = [];
        try {
          const { data: profileData } = await supabase
            .from('user_profiles')
            .select('favorites')
            .eq('id', data.user.id)
            .single();
          if (profileData?.favorites) {
            userFavs = profileData.favorites;
          }
        } catch {
          // ignore table absence
        }

        const profile: UserProfile = {
          id: data.user.id,
          email: cleanEmail,
          favorites: userFavs,
          createdAt: data.user.created_at || new Date().toISOString(),
          isDemoUser: false,
        };
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(profile));
        return { user: profile, error: null };
      }
    }

    // Local / Offline fallback auth
    const profiles = getLocalProfiles();
    const stored = profiles[cleanEmail];
    if (!stored || stored.passwordHash !== btoa(password)) {
      return { user: null, error: 'Invalid email or password.' };
    }

    const localProfile: UserProfile = {
      id: 'local_' + Math.random().toString(36).substring(2, 9),
      email: cleanEmail,
      favorites: stored.favorites || [],
      createdAt: new Date().toISOString(),
      isDemoUser: true,
    };
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(localProfile));
    return { user: localProfile, error: null };
  },

  async signOut(): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.error('Supabase signOut error', e);
      }
    }
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  },

  async syncUserFavorites(userId: string, favorites: string[]): Promise<void> {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      currentUser.favorites = favorites;
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(currentUser));
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('user_profiles').upsert({
          id: userId,
          favorites,
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.error('Remote sync failed', err);
      }
    } else {
      if (currentUser?.email) {
        const profiles = getLocalProfiles();
        if (profiles[currentUser.email]) {
          profiles[currentUser.email].favorites = favorites;
          saveLocalProfiles(profiles);
        }
      }
    }
  }
};

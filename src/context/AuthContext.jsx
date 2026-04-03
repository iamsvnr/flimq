import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/supabase';

const AuthContext = createContext();

// Gender-specific avatar styles
const MALE_STYLES = ['adventurer', 'avataaars', 'bottts', 'micah', 'pixel-art'];
const FEMALE_STYLES = ['lorelei', 'adventurer', 'personas', 'micah', 'fun-emoji'];
const OTHER_STYLES = ['bottts', 'fun-emoji', 'pixel-art', 'miniavs', 'micah'];

function generateAvatarUrl(seed, gender = 'other') {
  const styles = gender === 'male' ? MALE_STYLES : gender === 'female' ? FEMALE_STYLES : OTHER_STYLES;
  const styleIndex = Math.abs(hashCode(seed)) % styles.length;
  const style = styles[styleIndex];
  return `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(seed + '_' + gender)}`;
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function calculateAge(dob) {
  if (!dob) return 0;
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

function buildUser(u, profile) {
  const meta = u.user_metadata || {};
  const name = meta.name || u.email?.split('@')[0] || 'User';
  const gender = profile?.gender || meta.gender || 'other';
  const dob = profile?.dob || null;
  const age = calculateAge(dob);
  const isAdult = age >= 18;
  const avatarUrl = meta.avatar_url || generateAvatarUrl(u.email || u.id, gender);
  const emailVerified = !!u.email_confirmed_at;
  return {
    id: u.id,
    name,
    email: u.email,
    avatar: name.charAt(0).toUpperCase(),
    avatarUrl,
    gender,
    dob,
    age,
    isAdult,
    emailVerified,
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adultEnabled, setAdultEnabled] = useState(false);

  const fetchProfile = async (userId) => {
    try {
      const { data } = await supabase
        .from('user_profiles')
        .select('gender, dob')
        .eq('user_id', userId)
        .maybeSingle();
      return data || null;
    } catch {
      return null;
    }
  };

  const initUser = async (supabaseUser) => {
    let profile = null;
    try {
      profile = await fetchProfile(supabaseUser.id);
    } catch {}
    // If no profile row exists, create it from signup metadata
    if (!profile) {
      const meta = supabaseUser.user_metadata || {};
      if (meta.gender || meta.dob) {
        try {
          await supabase.from('user_profiles').upsert(
            { user_id: supabaseUser.id, gender: meta.gender || 'male', dob: meta.dob || '2000-01-01' },
            { onConflict: 'user_id' }
          );
          profile = { gender: meta.gender || 'male', dob: meta.dob || '2000-01-01' };
        } catch {}
      }
    }
    const built = buildUser(supabaseUser, profile);
    setUser(built);
    if (!built.isAdult) setAdultEnabled(false);
    return built;
  };

  useEffect(() => {
    let initialized = false;
    let currentUserId = null;

    const setReady = () => {
      if (!initialized) {
        initialized = true;
        setLoading(false);
      }
    };

    const restore = async (supabaseUser) => {
      if (!supabaseUser) {
        setReady();
        return;
      }
      // Skip if same user already restored
      if (currentUserId === supabaseUser.id && initialized) return;
      currentUserId = supabaseUser.id;
      try {
        await initUser(supabaseUser);
        fetchPreferences(supabaseUser.id);
      } catch {}
      setReady();
    };

    // 1. Restore session from localStorage
    supabase.auth.getSession().then(({ data: { session } }) => {
      restore(session?.user || null);
    }).catch(() => setReady());

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        currentUserId = null;
        setUser(null);
        setAdultEnabled(false);
        setReady();
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        restore(session?.user || null);
      }
    });

    // 3. Fallback timeout
    const timeout = setTimeout(() => setReady(), 3000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const fetchPreferences = async (userId) => {
    try {
      const { data } = await supabase
        .from('user_preferences')
        .select('adult_enabled')
        .eq('user_id', userId)
        .maybeSingle();
      if (data) {
        setAdultEnabled(data.adult_enabled || false);
      }
    } catch {}
  };

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        return { success: false, error: 'Invalid email or password' };
      }
      if (error.message.includes('Email not confirmed')) {
        return { success: false, error: 'Please confirm your email before signing in' };
      }
      return { success: false, error: error.message };
    }
    return { success: true };
  };

  const signup = async (name, email, password, gender, dob) => {
    const avatarUrl = generateAvatarUrl(email, gender);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, avatar_url: avatarUrl, gender, dob },
      },
    });
    if (error) {
      if (error.message.includes('already registered') || error.message.includes('already been registered')) {
        return { success: false, error: 'Email already registered' };
      }
      return { success: false, error: error.message };
    }
    if (data?.user && data.user.identities?.length === 0) {
      return { success: false, error: 'Email already registered' };
    }
    if (data?.user && !data.session) {
      return { success: true, needsConfirmation: true };
    }
    return { success: true };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setAdultEnabled(false);
  };

  const toggleAdult = async () => {
    if (!user || !user.isAdult) return;
    const newValue = !adultEnabled;
    setAdultEnabled(newValue);
    await supabase
      .from('user_preferences')
      .upsert({ user_id: user.id, adult_enabled: newValue }, { onConflict: 'user_id' });
  };

  const resetPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/profile`,
    });
    if (error) {
      const msg = error.message?.toLowerCase().includes('rate limit')
        ? 'Too many requests. Please wait a few minutes before trying again.'
        : error.message;
      return { success: false, error: msg };
    }
    return { success: true };
  };

  const updateProfile = async (updates) => {
    const { data, error } = await supabase.auth.updateUser({
      data: updates,
    });
    if (error) return { success: false, error: error.message };
    if (data?.user) {
      const profile = await fetchProfile(data.user.id);
      setUser(buildUser(data.user, profile));
    }
    return { success: true };
  };

  const updateGender = async (gender) => {
    try {
      // Try update first (works if row exists)
      const { data, error } = await supabase
        .from('user_profiles')
        .update({ gender })
        .eq('user_id', user.id)
        .select();

      if (error) return { success: false, error: error.message };

      // If no row was updated, insert a new one
      if (!data || data.length === 0) {
        const { error: insertErr } = await supabase
          .from('user_profiles')
          .insert({
            user_id: user.id,
            gender,
            dob: user.dob || '2000-01-01',
          });
        if (insertErr) return { success: false, error: insertErr.message };
      }
    } catch {
      // Table might not exist — update locally anyway
    }
    // Regenerate avatar with new gender
    const newAvatarUrl = generateAvatarUrl(user.email || user.id, gender);
    try {
      await supabase.auth.updateUser({ data: { avatar_url: newAvatarUrl } });
    } catch {}
    // Rebuild user state locally regardless of DB success
    setUser((prev) => prev ? {
      ...prev,
      gender,
      avatarUrl: newAvatarUrl,
    } : prev);
    return { success: true };
  };

  const deleteAccount = async () => {
    if (!user) return { success: false, error: 'Not logged in' };
    try {
      const { error } = await supabase.rpc('delete_user');
      if (error) return { success: false, error: error.message };
    } catch (e) {
      return { success: false, error: e.message };
    }
    await supabase.auth.signOut();
    setUser(null);
    setAdultEnabled(false);
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, adultEnabled, toggleAdult, resetPassword, updateProfile, updateGender, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

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
    const { data } = await supabase
      .from('user_profiles')
      .select('gender, dob')
      .eq('user_id', userId)
      .single();
    return data || null;
  };

  const initUser = async (supabaseUser) => {
    const profile = await fetchProfile(supabaseUser.id);
    const built = buildUser(supabaseUser, profile);
    setUser(built);
    if (!built.isAdult) setAdultEnabled(false);
    return built;
  };

  useEffect(() => {
    let initialized = false;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setAdultEnabled(false);
        if (!initialized) {
          initialized = true;
          setLoading(false);
        }
      } else if (session?.user) {
        await initUser(session.user);
        fetchPreferences(session.user.id);
        if (!initialized) {
          initialized = true;
          setLoading(false);
        }
      } else if (event === 'INITIAL_SESSION') {
        // No session on initial load = not logged in
        initialized = true;
        setLoading(false);
      }
    });

    // Fallback: if onAuthStateChange never fires, stop loading after timeout
    const timeout = setTimeout(() => {
      if (!initialized) {
        initialized = true;
        setLoading(false);
      }
    }, 3000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const fetchPreferences = async (userId) => {
    const { data } = await supabase
      .from('user_preferences')
      .select('adult_enabled')
      .eq('user_id', userId)
      .single();
    if (data) {
      setAdultEnabled(data.adult_enabled || false);
    }
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
        data: { name, avatar_url: avatarUrl },
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
    // Store gender & DOB in user_profiles table
    if (data?.user) {
      await supabase.from('user_profiles').upsert(
        { user_id: data.user.id, gender, dob },
        { onConflict: 'user_id' }
      );
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
    if (error) return { success: false, error: error.message };
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
    const { error } = await supabase
      .from('user_profiles')
      .update({ gender })
      .eq('user_id', user.id);
    if (error) return { success: false, error: error.message };
    // Regenerate avatar with new gender
    const newAvatarUrl = generateAvatarUrl(user.email || user.id, gender);
    await supabase.auth.updateUser({ data: { avatar_url: newAvatarUrl } });
    const { data: { user: freshUser } } = await supabase.auth.getUser();
    if (freshUser) {
      const profile = await fetchProfile(freshUser.id);
      setUser(buildUser(freshUser, profile));
    }
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, adultEnabled, toggleAdult, resetPassword, updateProfile, updateGender }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

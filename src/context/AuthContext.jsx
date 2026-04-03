import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('flimq-user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('flimq-user');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('flimq-users') || '[]');
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return { success: false, error: 'Invalid email or password' };

    const userData = { name: found.name, email: found.email, avatar: found.name.charAt(0).toUpperCase() };
    setUser(userData);
    localStorage.setItem('flimq-user', JSON.stringify(userData));
    return { success: true };
  };

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('flimq-users') || '[]');
    if (users.some((u) => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('flimq-users', JSON.stringify(users));

    const userData = { name, email, avatar: name.charAt(0).toUpperCase() };
    setUser(userData);
    localStorage.setItem('flimq-user', JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('flimq-user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

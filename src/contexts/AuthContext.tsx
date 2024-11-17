import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  name: string;
  // Add other user properties as needed
}

interface AuthContextType {
  profile: any;
  isLoading: boolean;
  setProfile: (user: any | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setProfile(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const value = {
    profile,
    isLoading,
    setIsLoading,
    setProfile: (newUser: User | null) => {
      setProfile(newUser);
      if (newUser) {
        localStorage.setItem('user', JSON.stringify(newUser));
      } else {
        localStorage.removeItem('user');
      }
    },
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
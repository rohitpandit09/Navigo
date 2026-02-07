import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type UserRole = 'user' | 'expert' | null;

interface AuthState {
  isAuthenticated: boolean;
  role: UserRole;
  userName: string;
  userAvatar: string;
  bookedExpertId: number | null;
}

interface AuthContextType extends AuthState {
  login: (role: UserRole, name: string) => void;
  logout: () => void;
  signup: (role: UserRole, name: string, email: string) => void;
  bookExpert: (expertId: number) => void;
  cancelBooking: () => void;
}

const defaultAvatar = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80';
const expertAvatar = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    role: null,
    userName: '',
    userAvatar: defaultAvatar,
    bookedExpertId: null
  });

  const login = useCallback((role: UserRole, name: string) => {
    setAuthState({
      isAuthenticated: true,
      role,
      userName: name,
      userAvatar: role === 'expert' ? expertAvatar : defaultAvatar,
      bookedExpertId: null
    });
  }, []);

  const logout = useCallback(() => {
    setAuthState({
      isAuthenticated: false,
      role: null,
      userName: '',
      userAvatar: defaultAvatar,
      bookedExpertId: null
    });
  }, []);

  const signup = useCallback((role: UserRole, name: string, _email: string) => {
    setAuthState({
      isAuthenticated: true,
      role,
      userName: name,
      userAvatar: role === 'expert' ? expertAvatar : defaultAvatar,
      bookedExpertId: null
    });
  }, []);

  const bookExpert = useCallback((expertId: number) => {
    setAuthState(prev => ({
      ...prev,
      bookedExpertId: expertId
    }));
  }, []);

  const cancelBooking = useCallback(() => {
    setAuthState(prev => ({
      ...prev,
      bookedExpertId: null
    }));
  }, []);

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
      signup,
      bookExpert,
      cancelBooking
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

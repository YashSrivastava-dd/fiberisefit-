import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { authAPI } from '@/lib/api/client';

export interface User {
  userId: string;
  phone: string;
  firebaseUid?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  sendOTP: (phoneNumber: string) => Promise<void>;
  verifyOTP: (phoneNumber: string, otp: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Store confirmation result for OTP verification
let confirmationResult: any = null;

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize state from localStorage on mount (for page refresh)
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  });
  const [loading, setLoading] = useState(true);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);

  // Initialize reCAPTCHA verifier
  useEffect(() => {
    if (typeof window !== 'undefined' && !recaptchaVerifier) {
      try {
        const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: () => {
            // reCAPTCHA solved
          },
          'expired-callback': () => {
            if (process.env.NODE_ENV !== 'production') {
              console.error('reCAPTCHA expired');
            }
          },
        });
        setRecaptchaVerifier(verifier);
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('Error initializing reCAPTCHA:', error);
        }
      }
    }
  }, []);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Get Firebase ID token
        const idToken = await firebaseUser.getIdToken();
        
        // Exchange Firebase token for our JWT token
        try {
          const response = await authAPI.verifyFirebaseToken(idToken);
          setToken(response.token);
          setUser(response.user);
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        } catch (error) {
          if (process.env.NODE_ENV !== 'production') {
            console.error('Error verifying Firebase token:', error);
          }
          // Only clear if token verification fails, not if Firebase auth is null
          await firebaseSignOut(auth);
          setToken(null);
          setUser(null);
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
        }
      } else {
        // Firebase auth is null - check if we have a valid token in localStorage
        const storedToken = localStorage.getItem('auth_token');
        if (storedToken) {
          // Try to verify the stored token is still valid
          try {
            const response = await authAPI.getMe();
            // Token is valid, keep user logged in
            setToken(storedToken);
            setUser(response.user);
            localStorage.setItem('user', JSON.stringify(response.user));
          } catch (error) {
            // Token is invalid or expired, clear everything
            if (process.env.NODE_ENV !== 'production') {
              console.error('Stored token invalid:', error);
            }
            setToken(null);
            setUser(null);
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
          }
        } else {
          // No stored token, user is logged out
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const sendOTP = async (phoneNumber: string) => {
    if (!recaptchaVerifier) {
      throw new Error('reCAPTCHA not initialized');
    }

    try {
      // Use Firebase Phone Authentication
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      confirmationResult = confirmation;
    } catch (error: any) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error sending OTP:', error);
      }
      throw new Error(error.message || 'Failed to send OTP');
    }
  };

  const verifyOTP = async (phoneNumber: string, otp: string) => {
    if (!confirmationResult) {
      throw new Error('No OTP session found. Please request a new OTP.');
    }

    try {
      // Verify OTP with Firebase
      await confirmationResult.confirm(otp);
      
      // Firebase handles the authentication, onAuthStateChanged will trigger
      // and exchange the Firebase token for our JWT token
      confirmationResult = null;
    } catch (error: any) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error verifying OTP:', error);
      }
      confirmationResult = null;
      throw new Error(error.message || 'Invalid OTP');
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      await authAPI.logout();
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error logging out:', error);
      }
    }
    setToken(null);
    setUser(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  };

  const refreshUser = async () => {
    if (!token) return;
    
    try {
      const response = await authAPI.getMe();
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error refreshing user:', error);
      }
      await logout();
    }
  };

  const value: AuthContextType = {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    sendOTP,
    verifyOTP,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Hidden reCAPTCHA container */}
      <div id="recaptcha-container" style={{ display: 'none' }} />
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}


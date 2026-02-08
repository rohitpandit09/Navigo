import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

export type UserRole = "user" | "expert" | null;

interface AuthState {
  isAuthenticated: boolean;
  role: UserRole;
  userName: string;
  userAvatar: string;
  userBio: string;
  bookedExpertId: string | null; // ✅ FIXED (string because Firestore doc ID is string)
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (
    role: UserRole,
    name: string,
    email: string,
    password: string
  ) => Promise<void>;

  bookExpert: (expertId: string) => void; // ✅ FIXED
  cancelBooking: () => void;
}

const defaultAvatar =
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80";

const expertAvatar =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    role: null,
    userName: "",
    userAvatar: defaultAvatar,
    userBio: "",
    bookedExpertId: null,
  });

  // ✅ Signup (REAL)
  const signup = useCallback(
    async (role: UserRole, name: string, email: string, password: string) => {
      if (!role) return;

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = userCredential.user.uid;

      // Store extra user data in Firestore
      await setDoc(doc(db, "users", uid), {
        name,
        email,
        role,
        avatar: role === "expert" ? expertAvatar : defaultAvatar,
        bio: "",
      });

      setAuthState({
        isAuthenticated: true,
        role,
        userName: name,
        userAvatar: role === "expert" ? expertAvatar : defaultAvatar,
        userBio: "",
        bookedExpertId: null,
      });
    },
    []
  );

  // ✅ Login (REAL + STRICT)
  const login = useCallback(async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const uid = userCredential.user.uid;

    try {
      const userDoc = await getDoc(doc(db, "users", uid));

      if (!userDoc.exists()) {
        throw new Error("User profile not found in Firestore!");
      }

      const userData = userDoc.data();

      setAuthState({
        isAuthenticated: true,
        role: userData.role,
        userName: userData.name,
        userAvatar: userData.avatar,
        userBio: userData.bio || "",
        bookedExpertId: null,
      });
    } catch (err) {
      // strict login (logout if firestore fails)
      await signOut(auth);
      throw new Error("Login failed: Unable to fetch user data. Check internet.");
    }
  }, []);

  // ✅ Logout (REAL)
  const logout = useCallback(async () => {
    await signOut(auth);

    setAuthState({
      isAuthenticated: false,
      role: null,
      userName: "",
      userAvatar: defaultAvatar,
      userBio: "",
      bookedExpertId: null,
    });
  }, []);

  // ✅ Auto Login after refresh
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      try {
        const uid = user.uid;
        const userDoc = await getDoc(doc(db, "users", uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();

          setAuthState({
            isAuthenticated: true,
            role: userData.role,
            userName: userData.name,
            userAvatar: userData.avatar,
            userBio: userData.bio || "",
            bookedExpertId: null,
          });
        }
      } catch (error) {
        console.log("Auto login failed:", error);
      }
    });

    return () => unsub();
  }, []);

  // ✅ Book Expert (Firestore expert id is string)
  const bookExpert = useCallback((expertId: string) => {
    setAuthState((prev) => ({
      ...prev,
      bookedExpertId: expertId,
    }));
  }, []);

  // ✅ Cancel Booking
  const cancelBooking = useCallback(() => {
    setAuthState((prev) => ({
      ...prev,
      bookedExpertId: null,
    }));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        signup,
        bookExpert,
        cancelBooking,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
